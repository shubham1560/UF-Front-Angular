import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginUser } from '../data-models/Login'
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {



  // Form logic

  loginForm: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]]      
    })

    // this.loginForm = new FormGroup(
    //   {
    //     email: new FormControl(),
    //     password: new FormControl()
    //   }
    // )
    this.testData();
  }

  save() {
    console.log(this.loginForm)
    console.log("Saved Working" + JSON.stringify(this.loginForm.value));
  }

  testData(){
    // We can use setValue to set all the values in the form
    this.loginForm.patchValue({
      email: 'shubhamsinha2050@gmail.com',
    });
  }


  // Google button logic
  
  declare const gapi: any;
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '858132682646-5tacv1knc5ujr15omjrhcm4gnv49mat7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
