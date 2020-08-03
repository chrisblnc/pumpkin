import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() placeholder: string;

  @Input() fa_icon = "";

  private LENGTH_PASSWORD = 6;

  val: string;

  @Output() alert = new EventEmitter<boolean>();
  @Output() value = new EventEmitter<string>();

  error = {
    "state": false,
    "message": ""
  }

  success: boolean;

  constructor() { }

  ngOnInit(): void {
    this.val = "";

    this.error.state = false;
    this.error.message = "";

    this.success = false;

    if (this.type === "email")
      this.fa_icon = "fa-envelope";
    else if (this.type === "password")
      this.fa_icon = "fa-lock";
  }

  onChange() { 
    this.success = this.isValid();
    this.error.state = !this.success;

    if (this.success)
      this.value.emit(this.val);      
    this.alert.emit(this.error.state);
  }

  isValid(): boolean {
    if (this.haveError())
      return false;
    return true;
  }

  isEmpty(): boolean {
    if (this.val === "")
      return true;
    return false;
  }

  isNotEmail(): boolean {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.val))
        return false;
    return true;
  }

  insufficientPasswordLength(): boolean {
    if (this.val.length >= this.LENGTH_PASSWORD)
        return false;
    this.error.message = "Password must contain at least 6 characters";
    return true;
  }

  haveError(): boolean {
    if (this.isEmpty())
      this.error.message = this.label + " is required";
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

}
