import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';

@Component({
  selector: 'app-addpathorbranch',
  templateUrl: './addpathorbranch.component.html',
  styleUrls: ['./addpathorbranch.component.scss']
})
export class AddpathorbranchComponent implements OnInit {

  addPathOrBranch: FormGroup

  constructor(
    private knowledgeService: DataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddpathorbranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  isLoading = false;
  successMessage = "";


  ngOnInit(): void {
    if (this.data.product) {
      this.addPathOrBranch = this.fb.group({
        title: [this.data.product.label, Validators.required],
        description: [this.data.product.description],
        active: [this.data.product.active],
      })
    }
    else {
      this.addPathOrBranch = this.fb.group({
        title: ["", Validators.required],
        description: [""],
        active: [true],
      })
    }
  }

  postPathOrBranch(): void {
    this.isLoading = true;
    this.knowledgeService.addPathOrBranch(this.addPathOrBranch.value, this.data).subscribe(
      response => {
        // console.log(response);
        this.isLoading = false;
        this.successMessage = "The action is successful, please exit this screen to see changes!!";
      }
    )
    // console.log(this.addPathOrBranch);
  }

  // editPathOrBranch():void{
    
  // }

}
