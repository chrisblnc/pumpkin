import { Component, OnInit } from '@angular/core';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error = {
    "pseudo": true,
    "email": true,
    "password": true,
    "passwordConfirmation": true,
    "termsAndConditions": false
  };

  errorMessage: string;

  pseudo: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  termsAndConditions: boolean;

  buttonLock = true;

  constructor() { }

  ngOnInit(): void {
    this.termsAndConditions = true;
    this.errorMessage = "";
  }

  onError(field: string, e: boolean) {
    this.error[field] = e;
  }

  checkTermsAndConditions() {
    this.error["termsAndConditions"] = !this.termsAndConditions;
    this.checkError();
  }

  checkError() {
    if (
      this.error.pseudo ||
      this.error.email ||
      this.error.password ||
      this.error.passwordConfirmation ||
      this.error.termsAndConditions
    )
      this.buttonLock = true;
    else
      this.buttonLock = false;
  }

  setPassword(e: string) {
    this.password = e;
  }

  setPasswordConfirmation(e: string) {
    this.passwordConfirmation = e;
  }

  passwordConfirmationNoMatch() {
    if (this.password === this.passwordConfirmation) {
      this.error.passwordConfirmation = false;
      this.errorMessage = "";
    }
    else {
      this.errorMessage = "Both password must match";
      this.error.passwordConfirmation = true;
    }
  }

}
