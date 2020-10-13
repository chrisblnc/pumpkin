import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import * as firebase from 'firebase';

@Injectable()
export class PostService {

  post: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor() {
    this.getPost();
  }
  
  emitPost() {
    this.postsSubject.next(this.post);
  }

  savePost() {
    firebase.database().ref('/post').set(this.post);
  }

  getPost() {
    firebase.database().ref('/post')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.post = data.val() ? data.val(): [];
      this.emitPost();
    });
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/post/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            console.error(error);
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.post.push(newPost);
    this.savePost();
    this.emitPost();
  }

  removePost(post: Post) {
    if (post.img) {
      const storageRef = firebase.storage().refFromURL(post.img);
      storageRef.delete().then(
        () => {
          console.log('Image removed!');
        }, 
        (error) => {
          console.error('Could not remove image : ' + error);
        }
      );
    }

    const postIndexToRemove = this.post.findIndex(
      (postE1) => {
        if (postE1 === post) {
          return true;
        } 
      }
    );

    this.post.splice(postIndexToRemove, 1);
    this.savePost();
    this.emitPost();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => {
            console.log('Loading...');
          }, 
          (error) => {
            console.error('Error! Upload failed : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
  
}
