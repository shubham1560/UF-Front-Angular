import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  dialogData = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public KnowledgeService: DataService,
    public loggerService: LoggerService,
  ) { }

  searchResults;

  ngOnInit(): void {
    this.KnowledgeService.getSearchResults(this.data.query).subscribe(
      (result:any)=>{
        this.searchResults = result;

      }
    )

    this.loggerService.logData("uf-search-results", this);
  }

}
