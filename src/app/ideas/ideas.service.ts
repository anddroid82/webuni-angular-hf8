import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Idea } from './models/idea.model';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  private _baseURL = `${environment.baseURL}/ideas`;

  constructor(private http:HttpClient) { }

  listIdeas(){
    return this.http.get<Idea[]>(`${this._baseURL}`);
  }

  upvoteIdea(idea:Idea) {
    return this.http.patch<{id:string}>(`${this._baseURL}/${idea.id}/upvote`,null);
  }

  downvoteIdea(idea:Idea) {
    return this.http.patch<{id:string}>(`${this._baseURL}/${idea.id}/downvote`,null);
  }

  deleteIdea(idea:Idea) {
    return this.http.delete<{id:string}>(`${this._baseURL}/${idea.id}`);
  }

}
