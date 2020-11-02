import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService } from 'src/app/services/support/support.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-ticket-details',
  templateUrl: './update-ticket-details.component.html',
  styleUrls: ['./update-ticket-details.component.scss']
})
export class UpdateTicketDetailsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateTicketDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private support: SupportService,
    private route: ActivatedRoute
  ) { }

  ticketDetail: FormGroup;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        console.log(params);
      }
    )

    this.ticketDetail = this.fb.group({
      state: [this.data.ticket.state, []],
      work_notes: [this.data.ticket.work_notes, []],
      additional_comments: [this.data.ticket.additional_comments, []],
    },)
  }

  updateDetail(){
    console.log(this.ticketDetail);
    this.data.ticket.work_notes = this.ticketDetail.get("work_notes").value;
    this.data.ticket.state = this.ticketDetail.get("state").value; 
    this.data.ticket.additional_comments = this.ticketDetail.get("additional_comments").value; 

    var toEdit = {
      "work_notes": this.ticketDetail.get("work_notes").value,
      "state": this.ticketDetail.get("state").value,
      "additional_comments": this.ticketDetail.get("additional_comments").value,
      "id": this.data.ticket.id
    }

    console.log(toEdit);
    this.support.editSupportRequest(toEdit, this.data.type).subscribe(
      result=>{
        console.log(result);
      }
    )


    this.dialogRef.close({data: this.data});
  }

}
