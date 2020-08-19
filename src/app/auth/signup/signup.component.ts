import { Component, OnInit } from '@angular/core';
import { ErrorInputService } from '../../services/error-input.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // for gestionnary of the input's error
  errorMail: any;

  errorField = {
    "pseudo": false,
    "email": false,
    "password": false
  };

  errorMessage: string;

  pseudo: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  termsAndConditions: boolean;

  buttonLock: boolean;

  // for ErrorInputService uses
  constructor(private errorInputService: ErrorInputService) { }

  ngOnInit(): void {
    this.pseudo = "t";
    this.email= "";
    this.password= "t";
    this.passwordConfirmation= "t";
    this.termsAndConditions = false;

    this.errorMessage = "";
    this.buttonLock = false;

    // error is the ErrorInputService now
    this.errorMail = this.errorInputService; 
  }

  // set the value of each input
  setValue(e:string, field: any) {
    switch (field) {
      case 'pseudo':
        this.pseudo = e;
        break;
      case 'email':
        this.email = e;
        break;
      case 'password':
        this.password = e;
        break;
      case 'passwordConfirmation':
        this.passwordConfirmation = e;
        break;
      default:
        console.error("Error, unknown field name : " + field);
    }
  }

  // check if the form can enable the button
  /*
  canEnableBtn() {
    if (
      this.error.pseudo != "" ||
      
      this.error.email ||
      this.error.password ||
      this.error.passwordConfirmation ||
     
      this.error.termsAndConditions
    )
      this.buttonLock = true;
    else
      this.buttonLock = false;
  }
  */

  //--- function we do not uses yet ---//
  /*
  passwordConfirmationNoMatch(): string {
    console.log("flag");
    if (this.errorMessage != "")
      return this.errorMessage;
    return "";    
  }

  passwordCheckMactch() {
    if (this.password === this.passwordConfirmation) {
      this.error.passwordConfirmation = false;
      this.errorMessage = "";
    }
    else {
      this.errorMessage = "Both password must match";
      this.error.passwordConfirmation = true;
    }

    console.log("check : " + this.errorMessage);
    console.log("val 1 : " + this.password + " / val 2 :" + this.passwordConfirmation)
  }
  */

  // when the user valid the form
  onSubmit() {
    // here we need to check if mail is a mail, if pwd & pwd conf are matching 
    // if mail has error then put it in red
    // if pwd & pwd conf are no matching then put their in red
    this.errorField.email  = this.errorMail.checkIfEmpty(this.email);
    

    console.log(this.errorField.email);
  }
}
