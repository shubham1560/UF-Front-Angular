import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SupportService } from 'src/app/services/support/support.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTicketDetailsComponent } from '../update-ticket-details/update-ticket-details.component';

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
    private title: Title,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ticketDetail;
  ticket_id;
  ticket_type;
  staff = false;

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>()
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        this.ticket_id = params.get('id');
        this.ticket_type = params.get('type');
        // console.log(params)
        this.support.getSupportTicketDetails(this.ticket_id, this.ticket_type).subscribe(
          (result:any)=>{
            this.ticketDetail = result.data;
            this.staff = result.staff;
            this.notify.emit(true);
            this.title.setTitle(this.ticketDetail.short_description +" - "+ this.ticket_type+ " - SortedTree");
          }, error =>{
            // console.log(error);
            this.notify.emit(false);
            this.router.navigate(['support', 'tickets']);
          }
        )
      }
    )
    // console.log(this);
    
    this.log.logData('st-ticket-detail', this);
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateTicketDetailsComponent, {
      minWidth: '280px',
      data: {ticket: this.ticketDetail, type:this.ticket_type}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      // console.log(this.ticketDetail);
      
      // this.ticketDetail = result.data;
        // this.animal = result;
    });
  }


}
