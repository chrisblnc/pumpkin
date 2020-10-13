import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import * as firebase from 'firebase';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  
  userID: number;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserID(firebase.auth().currentUser.email).then(
      (id: number) => {
        this.userID = id;
      }
    );
    
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      content: ['', Validators.required],
      like: 0,
      msg: 0
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onSubmitPost() {
    const author = this.userID;
    const content = this.postForm.get('content').value;
    const like = this.postForm.get('like').value;
    const msg = this.postForm.get('msg').value;
    const date = Date.now();

    const newPost = new Post(author, content, like, msg, date);

    if (this.fileUrl && this.fileUrl !== "") {
      newPost.img = this.fileUrl;
    }

    this.postService.createNewPost(newPost);
    this.router.navigate(['/post']);
  }
}
