import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import *  as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['welcome']);
  }

}
