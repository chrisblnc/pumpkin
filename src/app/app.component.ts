import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private firebaseConfig = {
    apiKey: "AIzaSyCneTRpvNb82URMBjeUtMzCeQJTurSVlqo",
    authDomain: "angular-blog-7d4b0.firebaseapp.com",
    databaseURL: "https://angular-blog-7d4b0.firebaseio.com",
    projectId: "angular-blog-7d4b0",
    storageBucket: "angular-blog-7d4b0.appspot.com",
    messagingSenderId: "711545755854",
    appId: "1:711545755854:web:b2ab10831241c11203d89f",
    measurementId: "G-08Y2RQV071"
  };

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
  }
}
