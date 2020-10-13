import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Message } from '../models/message.model';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  messageForm: FormGroup;
  userID: number;

  posts: Post[];
  users: User[];
  postSubscription: Subscription;
  userSubscription: Subscription;
  modal: boolean[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postSubscription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPost();

    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    )
    this.userService.emitUsers();

    this.userService.getUserID(firebase.auth().currentUser.email).then(
      (id: number) => {
        this.userID = id;
      }
    );
    
    this.initForm();
  }

  initForm() {
    this.messageForm = this.formBuilder.group({
      msg: ['', Validators.required],
      like: 0,
      date: Date
    });
  }

  onNewPost() {
    this.router.navigate(['/post', 'new']);
  }

  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }

  onViewPost(id: number) {
    this.router.navigate(['/post', id]);
  }

  onLike(post: Post) {
    post.like = post.like + 1;
    this.postService.savePost();
    this.postService.emitPost();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onOpenComment(index: number): void {
    this.modal[index] = true;
    this.disableScrolling();
  }

  onSendMessage(index: number, post: Post): void {    
    this.enableScrolling();
    const author = this.userID;
    const msg = this.messageForm.get('msg').value;
    const postID = index;
    const like = this.messageForm.get('like').value;
    const date = Date.now(); 

    const newMessage = new Message(author, msg, postID, like, date);
    this.messageService.createNewMessage(newMessage);
    
    post.msg = post.msg + 1;
    this.postService.savePost();
    this.postService.emitPost();
    this.router.navigate(['/post', index]);
  }

  onCloseComment(index: number): void {
    this.modal[index] = false;
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
