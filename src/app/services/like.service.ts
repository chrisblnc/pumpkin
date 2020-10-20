import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Like } from '../models/like.model';
import * as firebase from 'firebase';

@Injectable()
export class LikeService {

  likes: Like[] = [];
  likesSubject = new Subject<Like[]>();

  constructor() {
    this.getLikes();
  }

  emitLikes() {
    this.likesSubject.next(this.likes);
  }

  saveLikes() {
    firebase.database().ref('/likes').set(this.likes);
  }

  getLikes() {
    firebase.database().ref('/likes')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.likes = data.val() ? data.val() : [];
      this.emitLikes();
    });
  }

  addLike(newLike: Like) {
    this.likes.push(newLike);
    this.saveLikes();
    this.emitLikes();
  }

  removeLike(like: Like) {
    const likeIndexToRemove = this.likes.findIndex(
      (likeE1) => {
        if (likeE1 == like) {
          return true;
        }
      }
    );
    this.likes.splice(likeIndexToRemove, 1);
    this.saveLikes();
    this.emitLikes();
  }
}
