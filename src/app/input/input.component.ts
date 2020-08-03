import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() name: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() fa_icon = "";

  private LENGTH_PASSWORD = 6;

  value: string;

  private error = {
    "state": false,
    "message": ""
  }

  constructor() { }

  ngOnInit(): void {
    this.value = "";

    this.error.state = false;
    this.error.message = "";
  }

  onChange() {
    this.error.state = !this.isValid();

    console.log(this.error);
  }

  isValid(): boolean {
    if (this.haveError())
      return false;
    return true;
  }

  isEmpty(): boolean {
    if (this.value === "")
      return true;
    return false;
  }

  isNotEmail(): boolean {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.value))
        return false;
    return true;
  }

  insufficientPasswordLength(): boolean {
    if (this.value.length >= this.LENGTH_PASSWORD)
        return false;
    this.error.message = "Password must contain at least 6 characters";
    return true;
  }

  haveError(): boolean {
    if (this.isEmpty())
      this.error.message = this.name + " is required";
    else if (this.type === "email")
      if (this.isNotEmail())
        this.error.message = "Must be a valid email";
      else 
        this.error.message = "";
    else if (this.type === "password")
      if (this.insufficientPasswordLength())
        this.error.message = "Password must contain at least 6 characters";
    else
      this.error.message = "";

    if (this.error.message != "")
      return true;    
    return false;
  }

  getErrorMessage(): string {
    return this.error.message;
  }

  getErrorState(): boolean {
    return this.error.state;
  }

}
