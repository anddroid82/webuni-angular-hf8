import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;
  username:string='';

  constructor(private authService: AuthService, private router:Router) {

  }
  
  ngOnInit(): void {
    this.authService.currentUser.subscribe( user => {
      if (user !== undefined) {
        this.isLoggedIn = true;
        this.username = user.email;
      }else{
        this.isLoggedIn = false;
        this.username = '';
      }
    })
  }

  logout() {
    this.authService.logout().subscribe();
  }

  goToIdeaForm(){
    this.router.navigateByUrl('/ideas/new');
  }

  goToListIdeas(){
    this.router.navigateByUrl('/ideas');
  }

}
