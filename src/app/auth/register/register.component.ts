import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'

function passwordMatch(c: AbstractControl): {[key: string]: boolean} | null{
  const p1 = c.get('password');
  const p2 = c.get('confirm_password');

  if(p1.pristine || p2.pristine){
    return null;
  }

  if(p1.value === p2.value){
    return null;
  }
  return {'match': true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
      }, {validators: passwordMatch}),
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]]
    })

    console.log(this.registrationForm);

    this.registrationForm.get('email').valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => console.log(value),
    )
  }

  save(){
    console.log("Registered the user");
  }

}
