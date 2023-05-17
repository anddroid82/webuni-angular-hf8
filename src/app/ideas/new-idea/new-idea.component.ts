import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Idea } from '../models/idea.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit {

  isEditing: boolean = false;
  inProgress: boolean = false;
  ideaId:string = '';
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private ideaService: IdeasService, private router: Router, private activatedRoute: ActivatedRoute, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      //console.log(data['idea']);
      const idea = data['idea'];
      this.isEditing = !!idea;
      if (this.isEditing) {
        this.ideaId = idea.id;
        this.form.setValue({
          name: idea.name,
          description: idea.description
        });
      } else {
        this.form.reset();
      }
    })
  }

  get ideasSer() {
    return this.ideaService;
  }

  addIdea() {
    this.inProgress = true;
    const idea: Idea = new Idea(this.ideaId, this.form.value.name, this.form.value.description, 0);
    const observer = this.isEditing ? this.ideaService.updateIdea(idea) : this.ideaService.addIdea(idea);
    observer.subscribe({
      next: () => {
        this.router.navigateByUrl('/ideas');
      }, error: () => {
        this.snackBar.open('Hiba történt!','OK',{duration:5000});
        this.inProgress=false;
      }
    });
  }

}
