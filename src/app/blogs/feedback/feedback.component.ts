import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public article_from_modal: any,
  ) { }

  feedbackForm: FormGroup;
  disableButton = false;

  ngOnInit(): void {
    console.log(this.article_from_modal.name);
    this.feedbackForm = this.fb.group({
      feedback: ['', [Validators.minLength(1), Validators.required]],
    })
  }

  save(){
    this.disableButton = true;
    console.log(this.feedbackForm.value["feedback"]);
  }

}
