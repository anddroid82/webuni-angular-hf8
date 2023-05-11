import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authService: AuthService, private router:Router) {

  }
  
  ngOnInit(): void {
    this.authService.currentUser.subscribe( user => {
      if (user !== undefined) {
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
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
