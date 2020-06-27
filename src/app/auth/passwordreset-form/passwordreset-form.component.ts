import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        console.log(params);
      }
    )

    this.passwordResetForm = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(10)]],
        confirm_password: ['', [Validators.required, Validators.minLength(10)]]
      }, { validators: passwordMatch }),
    })
  }

  save(){
    console.log(this);
    console.log("Password has been reset");
  }

}
