import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/services/support/support.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  constructor(
    private support: SupportService
  ) { }

  ngOnInit(): void {
    this.support.getSupportTicketDetails(26, 'defect').subscribe(
      result=>{
        console.log(result);
      }, error =>{
        console.log(error);
        
      }
    )
  }

}
