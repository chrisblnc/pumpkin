import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import *  as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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

  OnDropdown(): void {
    const dropdown = document.getElementById('dropdown-menu-footer');
    
    dropdown.classList.toggle('is-active');
  }
  
  onOpenModalFooter(): void {
    const modal = document.getElementById('modal-menu-footer');
    modal.classList.add('is-active');
    this.disableScrolling();
  }

  onCloseModalFooter(): void {
    const modal = document.getElementById('modal-menu-footer');
    modal.classList.remove('is-active');
    this.enableScrolling();
  }

  disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
  }

  enableScrolling(){
    window.onscroll=function(){};
  }
}
