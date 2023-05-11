import { Component, OnInit } from '@angular/core';
import { Idea } from '../models/idea.model';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.scss']
})
export class ListIdeasComponent implements OnInit {

  ideas:Idea[] = [];

  constructor(private ideasService:IdeasService) {

  }
  ngOnInit(): void {
    this.listIdeas();
  }

  listIdeas() {
    this.ideasService.listIdeas().subscribe(ideas => {
      this.ideas = ideas;
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

  deleteIdea(idea:Idea) {
    this.ideasService.deleteIdea(idea).subscribe(_ => this.listIdeas());
  }

}
