import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  passwordagain: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  registration() {
    const user: User = new User('', this.username, this.email, this.password);
    this.authService.registerUser(user).subscribe( u => this.router.navigateByUrl('/login'));
  }

  backToLogin() {
    this.router.navigateByUrl('/login');
  }

}
