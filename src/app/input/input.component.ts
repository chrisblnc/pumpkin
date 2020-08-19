import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

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

  // get an error in the form 
  @Input() errorMessage: string;

  // return the user's value 
  @Output() value = new EventEmitter<string>();

  // the user's value 
  userValue: string;
  
  // state if there is an error
  errorState: boolean;

  // value for hide error or success indicator
  hide = {
    "error": true,
    "success": true
  };

  constructor() { }

  // on changes
  ngOnChanges(): void {
    if (this.errorMessage != "")
      this.errorState = true;
    else
      this.errorState = false;

    if (this.errorState === true) {
      this.hide.error = false;
      this.hide.success = true;
    }
    else {
      this.hide.error = true;
      this.hide.success = true;
    }
  }

  // on init
  ngOnInit(): void {

    if (this.type === "email")
      this.fa_icon = "fa-envelope";
    else if (this.type === "password")
      this.fa_icon = "fa-lock";

    this.hide.error = true;
    this.hide.success = true;
    this.errorMessage = "";

    this.userValue = "";
  }

  // when the user is typing something
  onType() {
    this.value.emit(this.userValue);
  }
}
