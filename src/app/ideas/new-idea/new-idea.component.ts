import { Component } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { Router } from '@angular/router';
import { Idea } from '../models/idea.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent {

  inProgress:boolean=false;
  form:FormGroup = new FormGroup()

  constructor(private ideaService: IdeasService, private router: Router) { }

  get ideasSer(){
    return this.ideaService;
  }

  addIdea(){
    this.inProgress=true;
    const idea:Idea = new Idea('',this.name,this.description,0);
    this.ideaService.addIdea(idea).subscribe( i => {
      this.router.navigateByUrl('/ideas');
    });
  }

}
