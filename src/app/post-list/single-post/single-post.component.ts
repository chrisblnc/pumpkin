import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Post } from '../../models/post.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit, OnDestroy {

  post: Post;
  userID: number;
  users: User[];
  userSubscription: Subscription;
  messages: Message[] = [];
  messageSubscription: Subscription;
  messageForm: FormGroup;
  postID: number;
  postSubscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
    }

    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
    });
  }

  ngOnInit(): void {
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

    const id = this.route.snapshot.params['id'];
    this.postService.getSinglePost(id).then(
      (post: Post) => {
        this.post = post;
      }
    );

    this.messageSubscription = this.messageService.messagesSubject.subscribe(
      (messages: Message[]) => {
        messages.forEach(msg => {
          if (msg.post.toString() === id) {
            this.messages.push(msg);
          }
        });      
      }
    );
    this.messageService.emitMessages();

    this.postID = id;
    this.initForm();
  }

  initForm() {
    this.messageForm = this.formBuilder.group({
      msg: ['', Validators.required],
      like: 0,
      date: Date
    });
  }

  onSendMessage(post: Post): void {
    const author = this.userID;
    const msg = this.messageForm.get('msg').value;
    const postID = this.postID;
    const like = this.messageForm.get('like').value;
    const date = Date.now(); 

    const newMessage = new Message(author, msg, postID, like, date);
    this.messageService.createNewMessage(newMessage);
    
    post.msg = post.msg + 1;
    this.postService.savePost();
    this.postService.emitPost();
    this.router.navigate(['/post', postID]);
  }

  onBack() {
    this.location.back();
  }

  onLike(post: Post) {
    post.like = post.like + 1;
    this.postService.savePost();
    this.postService.emitPost();
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
