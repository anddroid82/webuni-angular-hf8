import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Idea } from './models/idea.model';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, provideRouter } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {

  private _baseURL = `${environment.baseURL}/ideas`;

  constructor(private http: HttpClient) { }

  listIdeas() {
    return this.http.get<Idea[]>(`${this._baseURL}`);
  }

  getIdea(id: string) {
    return this.http.get<Idea>(`${this._baseURL}/${id}`);
  }

  upvoteIdea(idea: Idea) {
    return this.http.patch<{ id: string }>(`${this._baseURL}/${idea.id}/upvote`, null);
  }

  downvoteIdea(idea: Idea) {
    return this.http.patch<{ id: string }>(`${this._baseURL}/${idea.id}/downvote`, null);
  }

  deleteIdea(idea: Idea) {
    return this.http.delete<{ id: string }>(`${this._baseURL}/${idea.id}`);
  }

  addIdea(idea: Idea) {
    return this.http.post<Idea>(`${this._baseURL}`, idea);
  }

  updateIdea(idea: Idea) {
    return this.http.put<Idea>(`${this._baseURL}/${idea.id}`, idea);
  }

}

export const ideaResolver: ResolveFn<Idea | undefined> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const id = route.queryParams['id'];
    if (!id) {
      return undefined;
    }
    return inject(IdeasService).getIdea(id);
  };

  export const ideaViewResolver: ResolveFn<Idea | undefined> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const id = route.params['id'];
    if (!id) {
      return undefined;
    }
    return inject(IdeasService).getIdea(id);
  };
