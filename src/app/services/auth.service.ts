import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  // create a new user and connect him with firebase
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          }, 
          (error) => {
            console.error(error);
            reject(error);
          }
        );
      }
    );
  }

  // connect a user with firebase
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            console.error(error.code);
            reject(error.code);
          }
        );
      }
    );
  }

  // disconnect a user
  signOutUser() {
    firebase.auth().signOut();
  }
}
