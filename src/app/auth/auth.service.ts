import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environments'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User>(new User('', '', ''));
  private _baseURL = `${environment.baseURL}/auth`;
  private readonly loggedInuserKey='loggedInUser';
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>(`${this._baseURL}/login`, { email, password }).pipe(
      tap(user => {
        this._currentUser.next(user);
      })
    );
  }

  logout() {

  }

  isLoggedIn() {
    return this._currentUser.getValue() !== undefined;
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  private storeUserAfterLogin(user:User) {
    localStorage.setItem(this.loggedInuserKey,JSON.stringify(user));
  }

  private clearLocalStorage() {
    localStorage.removeItem(this.loggedInuserKey);
  }
}
