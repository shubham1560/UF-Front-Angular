import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  valid = false;
  onNotify(message){
    this.valid = message
  }

  ticket;

  onTicket(message){
    this.ticket =message;
    // console.log(message);
  }
}
