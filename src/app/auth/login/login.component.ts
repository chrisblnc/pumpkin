import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = {
    "email": true,
    "password": true
  };

  buttonLock = true;

  constructor() { }

  ngOnInit(): void {
  }

  onError(field: string, e: boolean) {
    this.error[field] = e;
  }

  checkError() {
    if (
      this.error.email ||
      this.error.password
    )
      this.buttonLock = true;
    else
      this.buttonLock = false;
  }

}
