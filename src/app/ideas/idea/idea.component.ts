import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idea } from '../models/idea.model';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {

  idea:Idea | undefined = undefined;

  constructor(private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( d => {
      this.idea = d['idea'];
    })
  }



}
