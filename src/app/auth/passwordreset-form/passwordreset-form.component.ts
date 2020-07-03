import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  selector: 'app-passwordreset-form',
  templateUrl: './passwordreset-form.component.html',
  styleUrls: ['./passwordreset-form.component.scss']
})
export class PasswordresetFormComponent implements OnInit {

  icon: string;
  passwordResetForm: FormGroup;
  token: string;
  hide: boolean = true;
  hide1: boolean = true;
  message: string;
  attempt:boolean = false;
  reset: boolean;
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        this.token = params.get('token');
      }
    )

    this.passwordResetForm = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(10)]],
        confirm_password: ['', [Validators.required, Validators.minLength(10)]]
      }, { validators: passwordMatch }),
    })
  }

  resetPassword(){
    this.attempt = true;
    this.authService.resetPassword(this.token, this.passwordResetForm.get('passwordGroup.password').value).subscribe(
      response => {
        console.log(response);
        this.icon = "verified_user";
        this.message = "the password has been changed for the user";
        this.reset = true;
      },
      error => {
        console.log(error);
        this.icon = "report_problem"
        this.message = "the url is invalid"
        this.reset = false;
      }
    )
  }

}
