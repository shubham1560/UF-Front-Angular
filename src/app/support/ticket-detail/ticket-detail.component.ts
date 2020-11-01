import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SupportService } from 'src/app/services/support/support.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})


export class TicketDetailComponent implements OnInit {

  constructor(
    private support: SupportService,
    private route: ActivatedRoute,
    private log: LoggerService,
  ) { }

  ticketDetail;
  ticket_id;
  ticket_type;

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>()
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        this.ticket_id = params.get('id');
        this.ticket_type = params.get('type');
        // console.log(params)
        this.support.getSupportTicketDetails(this.ticket_id, this.ticket_type).subscribe(
          result=>{
            this.ticketDetail = result;
            this.notify.emit(true);
          }, error =>{
            console.log(error);
            this.notify.emit(false);
          }
        )
      }
    )
    console.log(this);
    
    this.log.logData('st-ticket-detail', this);
  }
  

}
