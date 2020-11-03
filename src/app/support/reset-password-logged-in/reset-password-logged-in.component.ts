import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

function passwordMatch(c: AbstractControl): { [key: string]: boolean } | null {
  const p1 = c.get('password');
  const p2 = c.get('confirm_password');

  if (p1.pristine || p2.pristine) {
    return null;
  }

  if (p1.value === p2.value) {
    return null;
  }

  return { 'match': true }
}

@Component({
  selector: 'app-reset-password-logged-in',
  templateUrl: './reset-password-logged-in.component.html',
  styleUrls: ['./reset-password-logged-in.component.scss']
})
export class ResetPasswordLoggedInComponent implements OnInit {


  passwordResetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private title: Title
  ) { }

  submitting = false;

  ngOnInit(): void {
    this.title.setTitle("Reset password - SortedTree")
    if (this.authService.isLoggedIn()) {
      this.passwordResetForm = this.fb.group({
        old_password: ['', [Validators.required, Validators.minLength(8)]],
        passwordGroup: this.fb.group({
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirm_password: ['', [Validators.required, Validators.minLength(8)]]
        }, { validators: passwordMatch }),
      })
    }
    else{
      this.route.navigate(["support"]);
    }
  }

  message;
  resetPassword() {
    this.submitting = true
    console.log(this.passwordResetForm);
    var user_data = {
      "password": this.passwordResetForm.get("old_password").value,
      "new_password": this.passwordResetForm.get("passwordGroup").get("password").value
    }
    this.authService.resetPaswordLoggedIn(user_data).subscribe(
      (result:any)=>{
        console.log(result);
        // this.message = result;
        this.openSnackBar(result);
        this.route.navigate(["support"])
        this.submitting = false;
      }, (error:any)=>{
        console.log(error);
        // this.message = error;
        this.submitting = false;
        this.openSnackBar(error.error);
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,'', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}

