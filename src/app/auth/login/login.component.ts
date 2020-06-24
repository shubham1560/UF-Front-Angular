import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginUser } from '../data-models/Login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
  
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(),
        password: new FormControl()
      }
    )
  }

  save(){
    console.log(this.loginForm)
    console.log(this.loginForm);
    console.log("Saved Working"+JSON.stringify(this.loginForm.value));
  }

}
