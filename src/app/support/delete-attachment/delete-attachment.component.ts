import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-attachment',
  templateUrl: './delete-attachment.component.html',
  styleUrls: ['./delete-attachment.component.scss']
})
export class DeleteAttachmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    
  }

  deleteId(){
    this.dialogRef.close({delete: true});
  }

}
