import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

  mailsent: boolean;

  resetForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.mailsent = false;
    this.resetForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    })
  }

  save() { 
    this.mailsent = true;
    console.log(this.resetForm)
    console.log(JSON.stringify(this.resetForm.value))
  }

}
