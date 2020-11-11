import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/services/support/support.service';

@Component({
  selector: 'app-clear-cache',
  templateUrl: './clear-cache.component.html',
  styleUrls: ['./clear-cache.component.scss']
})
export class ClearCacheComponent implements OnInit {

  constructor(
    private support: SupportService
  ) { }

  message
  ngOnInit(): void {
    this.support.clearCache().subscribe(
      (response:any)=>{
        this.message = response.detail;
      },
      error=>{
        this.message = error.error.detail;
      }
    )
  }

}
