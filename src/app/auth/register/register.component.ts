import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

// function passwordMatch(c: AbstractControl): {[key: string]: boolean} | null{
//   const p1 = c.get('password');
//   const p2 = c.get('confirm_password');

//   if(p1.pristine || p2.pristine){
//     return null;
//   }

//   if(p1.value === p2.value){
//     return null;
//   }
//   return {'match': true};
// }

// function emaiValid(c: AbstractControl): { [key: string]: boolean } | null {
//   var em = c.get("email").value;
//   var emr = em.split('.');

//   if (emr[emr.length - 1] == '.com') {
//     console.log("well");
//     return null
//     // return {'valid': false}
//   }
//   if (c.get("email").pristine) {
//     return null;
//   }
//   console.log("returning")
//   return { 'value': false };
//   //return {'valid':true}
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  hide: boolean = true;
  user: {};
  disableButton: boolean = false
  registrationDone: boolean = false;
  errorMessage: string;
  error;
  response;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private loggerService: LoggerService) { }


  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      // passwordGroup: this.fb.group({
      //   password: ['', [Validators.required]],
      //   confirm_password: ['', [Validators.required]]
      // }, {validators: passwordMatch}),
      full_name: ['', [Validators.required,]],
    },)

    console.log(this.registrationForm);

    this.registrationForm.get('email').valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => { }
      // console.log(value),
    )

    this.loggerService.logData("auth-register", this);
  }

  register() {
    this.disableButton = true;
    console.log("Registered the user");
    console.log(this.registrationForm);
    this.user = {};
    this.user["email"] = this.registrationForm.value["email"];
    this.user["first_name"] = this.registrationForm.value["full_name"].split(" ")[0];
    this.user["last_name"] = this.registrationForm.value["full_name"].replace(this.user["first_name"] + " ", '').replace(this.user["first_name"], '');
    this.user["password"] = this.registrationForm.value["password"];
    this.authService.register_root_user(this.user).subscribe(
      response => {
        this.registrationDone = true;
        this.disableButton = true;
        this.response = response;
        console.log(response);
      },
      error => {
        // console.log(error.error["message"]);
        if (error.error["ue"]==true){
          this.errorMessage = error.error["message"];
        }else{
          this.errorMessage = "The email address is invalid";
        }
        
        // this.errorMessage = error.error;
        this.error = error;
        this.disableButton = false;
      }
    )
  }

}
