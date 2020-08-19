import { Injectable } from '@angular/core';

// gestionnary of the input's error
@Injectable()
export class ErrorInputService {

  constructor() { }

  // const for min length password required
  private LENGTH_PASSWORD = 6;

  // var for error message
  private message: string;

  // var for state message
  private state: boolean;

  // on init
  ngOnInit() {
    this.message = "";
    this.state = false;
  }

  // get the error message
  getMessage(): string {
    console.log(this.message);
    return this.message;
  }

  // get the error state
  getState(): boolean {
    return this.state;
  }

  // --------------------------- //

  // check if the val is empty
  checkIfEmpty(val): boolean {
    this.state = false;
    if (val === "") {
      this.state = true;
      this.message = "This field is required";
    }
    return this.state;
  }

  // check if the param is a valid email
  checkIsEmail(email: string): boolean {
    this.state = false;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email))
      this.state = true;
    return this.state;
  }

  // check if the password has the length required
  checkPasswordLength(password: string): boolean {
    this.state = false;
    if (password.length >= this.LENGTH_PASSWORD)
      this.state = true;
    this.message = "Password must contain at least "+ this.LENGTH_PASSWORD + " characters";
    return this.state;
  }
}
