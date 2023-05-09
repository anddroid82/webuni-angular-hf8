import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environments'
import { map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User | undefined>(undefined);
  private _baseURL = `${environment.baseURL}/auth`;
  private readonly loggedInuserKey = 'loggedInUser';

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem(this.loggedInuserKey);
    if (user) {
      this._currentUser.next(JSON.parse(user));
    }

    this.sessionInfo().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.handleLogout();
      }
    })
  }

  handleLogout() {
    this.clearLocalStorage();
    this._currentUser.next(undefined);
    this.router.navigateByUrl('/login');
  }

  sessionInfo() {
    return this.http.get<{ isLoggedIn: boolean }>(`${this._baseURL}/sessionInfo`).pipe(
      map(sessionInfo => sessionInfo.isLoggedIn)
    )
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this._baseURL}/login`, { email, password }).pipe(
      tap(user => {
        this.storeUserAfterLogin(user);
        this._currentUser.next(user);
      })
    );
  }

  logout() {
    return this.http.post(`${this._baseURL}/logout`, null).pipe(
      tap(_ => {
        this.handleLogout();
      })
    );
  }

  isLoggedIn() {
    return this._currentUser.getValue() !== undefined;
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  private storeUserAfterLogin(user: User) {
    localStorage.setItem(this.loggedInuserKey, JSON.stringify(user));
  }

  private clearLocalStorage() {
    localStorage.removeItem(this.loggedInuserKey);
  }
}
