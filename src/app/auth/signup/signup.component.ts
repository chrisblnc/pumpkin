import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      birthday: ['', [Validators.required]],
      create_at: Date.now()
    });
  }

  onSubmit() {
    const username = this.signupForm.get('username').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const birthday = this.signupForm.get('birthday').value;
    const create_at = this.signupForm.get('create_at').value;

    const newUser = new User(username, email, birthday, create_at);
    newUser.img = "https://firebasestorage.googleapis.com/v0/b/pumpkin-chrisblnc.appspot.com/o/avatar-default.png?alt=media&token=ea18dc57-a32b-42c8-991e-c020a005fc1c";    
    this.userService.addUser(newUser);

    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }  
}
