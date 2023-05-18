import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Idea } from '../models/idea.model';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {

  @Input() idea: Idea | undefined = undefined;
  @Output() ideaChange = new EventEmitter<Idea>();

  constructor(private ideasService: IdeasService) {

  }

  upVote() {
    this.ideasService.upvoteIdea(this.idea!).subscribe(r => {
      this.ideasService.getIdea(this.idea!.id).subscribe(i => {
        this.idea = i;
        this.ideaChange.emit(this.idea);
      })
    });
  }

  downVote() {
    this.ideasService.downvoteIdea(this.idea!).subscribe(r => {
      this.ideasService.getIdea(this.idea!.id).subscribe(i => {
        this.idea = i;
        this.ideaChange.emit(this.idea);
      })
    });
  }

  
}
