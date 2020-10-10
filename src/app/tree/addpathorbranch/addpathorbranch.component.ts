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

  ngOnInit(): void {
    this.addPathOrBranch = this.fb.group({
      title: ["", Validators.required],
      description: [""], 
      active: true,
    })
  }

  postPathOrBranch(): void{
    this.knowledgeService.addPathOrBranch(this.addPathOrBranch.value, this.data).subscribe(
      response => {
        console.log(response);
        
      }
    )
    // console.log(this.addPathOrBranch);
  }

}
