import { Component, OnInit } from '@angular/core';
import { Idea } from '../models/idea.model';
import { IdeasService } from '../ideas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.scss']
})
export class ListIdeasComponent implements OnInit {

  ideas:Idea[] = [];
  search:string = '';
  listInProgress:boolean = true;

  constructor(private ideasService:IdeasService, private router:Router) {

  }
  ngOnInit(): void {
    this.listIdeas();
  }

  listIdeas() {
    this.ideasService.listIdeas().subscribe(ideas => {
      this.ideas = ideas;
      this.listInProgress = false;
    });
  }

  upVote(idea:Idea) {
    this.ideasService.upvoteIdea(idea).subscribe(r => {
      console.log(r);
      this.listIdeas()
    });
  }

  downVote(idea:Idea) {
    this.ideasService.downvoteIdea(idea).subscribe(_ => this.listIdeas());
  }

  deleteIdea(idea: Idea) {
    this.ideasService.deleteIdea(idea).subscribe(_ => this.listIdeas());
  }

  editIdea(idea: Idea) {
    this.router.navigateByUrl(`/ideas/new?id=${idea.id}`);
  }
  
  beginSearch(){
    this.listInProgress = true;
    console.log(this.search);
    this.ideasService.searchIdea(this.search).subscribe( i =>{
      this.ideas = i;
      this.listInProgress = false;
    })
  }
}
