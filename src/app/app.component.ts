import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private firebaseConfig = {
    apiKey: "AIzaSyA_Rhnf0de92cagRE_JkdYkSm7C7PwdcqM",
    authDomain: "pumpkin-chrisblnc.firebaseapp.com",
    databaseURL: "https://pumpkin-chrisblnc.firebaseio.com",
    projectId: "pumpkin-chrisblnc",
    storageBucket: "pumpkin-chrisblnc.appspot.com",
    messagingSenderId: "753739167859",
    appId: "1:753739167859:web:0d158254833e6b12a29206",
    measurementId: "G-WJE3GSCGZ8"
  };

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
  }

}
