import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  subscribeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { 
    
  }

  ngOnInit() {

    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      // confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  subscribeViaMail(){
    // console.log( this.subscribeForm.get("email").value);
    //make the service to send it to the mailing list
  }

}
