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

  passwordResetForm: FormGroup;
  token: string;

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
    this.authService.resetPassword(this.token, this.passwordResetForm.get('passwordGroup.password').value).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

}
