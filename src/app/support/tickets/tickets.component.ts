import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/services/support/support.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})

export class TicketsComponent implements OnInit {

  constructor(
    private supportService: SupportService,
    private log: LoggerService
  ) { }

  defects;
  features;

  ngOnInit(): void {
    this.supportService.getSupportRequests().subscribe(
      (result:any)=>{
        console.log(result);
        this.defects = result.defects;
        this.features = result.features;
      }
    )
    this.log.logData('st-tickets', this);
  }

}
