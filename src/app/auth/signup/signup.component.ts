import { Component, OnInit } from '@angular/core';
import { ErrorInputService } from 'src/app/services/error-input.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error = {
    "pseudo": null,
    "email": null
  };

  submitLock: boolean;

  // for ErrorInputService uses
  constructor() { }

  ngOnInit(): void {
    this.submitLock = false;
  }

  onChange(): void {
    
  }

  getError(e: ErrorInputService, field: string): void {
    this.error[field] = e;
    if (this.error[field].getState())
      console.log(field + ": aie c'est vide ca...");
    else 
      console.log(field + ": ca c'est bien.");
  }

  onSubmit() {
    console.log("pseudo: " + this.error.pseudo.getState());
    console.log("email: " + this.error.email.getState());
  }

  makeError() {
    this.error.email.GenerateError("This must be a valid email");
  }
}
