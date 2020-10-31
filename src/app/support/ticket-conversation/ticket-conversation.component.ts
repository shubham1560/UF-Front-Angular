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

  ticket_id
    ticket_type
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        this.ticket_id = params.get('id');
        this.ticket_type = params.get('type');
        this.converse.postConverse(this.ticket_id, this.ticket_type, 'well it works somehow').subscribe(
          response =>{
            console.log(response);
          }, error =>{
            console.log(error);
          }
        )
        // console.log(params)
        // this.support.getSupportTicketDetails(this.ticket_id, this.ticket_type).subscribe(
        //   result=>{
        //     this.ticketDetail = result;
            
        //   }, error =>{
        //     console.log(error);
        //   }
        // )
      }
    )
    
  }

}
