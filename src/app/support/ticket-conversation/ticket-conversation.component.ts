import { Component, OnInit } from '@angular/core';
import { ConverseService } from 'src/app/services/converse/converse.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-conversation',
  templateUrl: './ticket-conversation.component.html',
  styleUrls: ['./ticket-conversation.component.scss']
})
export class TicketConversationComponent implements OnInit {

  constructor(
    private converse: ConverseService,
    private route: ActivatedRoute,
  ) { }

  ticket_id;
  ticket_type;
  comment;
  conversation = [];
  buttonText = "Send";

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.ticket_id = params.get('id');
        this.ticket_type = params.get('type');
        // this.postConversation("yolo maan, why is it taking so long!")
        this.getConversation();
      }
    )

  }

  sendMessage() {
    if (this.comment.length > 0) {
      this.postConversation(this.comment);
      this.ngOnInit();
    }
  }


  postConversation(comment) {
    this.converse.postConverse(this.ticket_id, this.ticket_type, comment).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    )
  }

  getConversation() {
    this.converse.getConverse(this.ticket_id, this.ticket_type).subscribe(
      (response: any) => {
        // console.log(response);
        this.conversation = response;
      }, error => {
        console.log(error);
      }
    )
  }

}
