import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private knowledgeService: DataService,
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public article_from_modal: any,
  ) { }

  feedbackForm: FormGroup;
  disableButton = false;
  feedbackReceived = false;

  ngOnInit(): void {
    // console.log(this.article_from_modal.name);
    this.feedbackForm = this.fb.group({
      feedback: ['', [Validators.minLength(1), Validators.required]],
    })
  }

  save() {
    this.disableButton = true;
    // console.log(this.feedbackForm.value["feedback"]);
    this.knowledgeService.addFeedback(this.article_from_modal.name, this.feedbackForm.value["feedback"]).subscribe(
      data => {
        // console.log(data);
        this.disableButton = false;
        this.feedbackReceived = true;
      },
      error => {
        this.disableButton = false;
        this.feedbackReceived = true;
        // console.log(error);
      }
    )
  }
}
