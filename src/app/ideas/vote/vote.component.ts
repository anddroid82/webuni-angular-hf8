import { Component, Input } from '@angular/core';
import { Idea } from '../models/idea.model';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {

  @Input() idea:Idea|undefined = undefined;

  constructor(private ideasService:IdeasService) {

  }

  upVote() {

  }

  downVote(){

  }

}
