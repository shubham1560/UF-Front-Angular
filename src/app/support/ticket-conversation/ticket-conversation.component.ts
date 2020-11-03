import { Component, OnInit, Input, EventEmitter } from '@angular/core';
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

  @Input() valid;
  @Input() ticket: any;


  ticket_id;
  ticket_type;
  comment;
  conversation = [];
  buttonText = "Send";
  sendingMessage = false;

  // @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnChanges(){


  }

  ngOnInit(): void {
    // console.log(this.valid);
    this.route.paramMap.subscribe(
      params => {
        this.ticket_id = params.get('id');
        this.ticket_type = params.get('type');
        // console.log(this.valid);
        this.getConversation();
      }
    )
    // console.log(this.ticket)

  }

  sendMessage() {
    if (this.comment.length > 0) {
      this.sendingMessage = true;
      this.buttonText = "Sending....";
      this.postConversation(this.comment);
      this.comment = ''
      // this.ngOnInit();
    }
  }


  postConversation(comment) {
    this.converse.postConverse(this.ticket_id, this.ticket_type, comment).subscribe(
      response => {
        this.getConversation();
      }, error => {
        this.sendingMessage = false;
        alert("unauthorized");
        this.buttonText = "can't send";
        // this.sendingMessage = false;
        // this.buttonText = "Send";
      }
    )
  }

  getConversation() {

    this.converse.getConverse(this.ticket_id, this.ticket_type).subscribe(
      (response: any) => {
        // console.log(response);
        this.conversation = response;
        this.sendingMessage = false;
        this.buttonText = "Send";
        this.isLoading = false;
      }, error => {
        // console.log(error);
        this.isLoading = false;
        this.sendingMessage = false;
        this.buttonText = "Send";
      }
    )
  }
  isLoading;
  reloadConverse(){
    this.isLoading = true;
    this.getConversation();
  }

}
