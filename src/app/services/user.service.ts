import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  users: User[] = [];
  userSubject = new Subject<User[]>();

  constructor() {
    this.getUser();
  }

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  saveUser() {
    firebase.database().ref('/user').set(this.users);
  }

  getUser() {
    firebase.database().ref('/user')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.users = data.val() ? data.val(): [];
      this.emitUsers();
    });
  }

  getOneUser(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/user/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      }
    )
  }

  getUserID(email: string) {
    var userId: number;
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/user')
        .on('value', (data: firebase.database.DataSnapshot) => {
          data.val().forEach((user, index) => {
            if (user.email === email) {
              userId = index;
              resolve(index);
            }
          })
        })
      }
    )

  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUser();
    this.emitUsers();
  }
}
