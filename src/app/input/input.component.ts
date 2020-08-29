import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorInputService } from '../services/error-input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  
  // input params
  @Input() label: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() name: string;

  // class of the icon inside the input
  @Input() fa_icon = "";

  // return the user's value 
  @Output() value = new EventEmitter<string>();

  // return an error
  @Output() error = new EventEmitter<ErrorInputService>();

  // value enter in the field
  userValue: string;

  // error of the field
  errorUser: ErrorInputService;

  // variable for formating the field
  hide = {
    "error": true,
    "success": true
  }

  constructor() { }

  // on init : initialize the field value
  ngOnInit(): void {
    this.userValue = "";
    this.errorUser = new ErrorInputService();
  }

  // on type : assign the value and error to get them outside the input
  // check if the field is empty and apply the corresponding format
  onType(): void {
    this.value.emit(this.userValue);

    this.checkError();

    this.error.emit(this.errorUser);
  }
  
  // check if the field have an error
  checkError(): void {
    // reinit the valude of hide
    this.hide.error = true;
    this.hide.success = true;

    // check if they are error
    if (this.errorUser.IsEmpty(this.userValue)) {
      this.hide.error = false;
    }
    else {
      switch (this.type) {
        // if is an email
        case 'email': 
          if (this.errorUser.IsNotEmail(this.userValue)) {
            this.hide.error = false;
          } else {
            this.hide.success = false;
          }
          break;
        // if is an password
        case 'password': 
          if (this.errorUser.IncorrectPasswordLength(this.userValue)) {
            this.hide.error = false;
          } else {
            this.hide.success = false;
          }
          break;
        default: 
          this.hide.success = false;
      }      
    }
  }
}
