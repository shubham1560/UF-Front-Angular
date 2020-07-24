import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-exploreroots',
  templateUrl: './exploreroots.component.html',
  styleUrls: ['./exploreroots.component.scss']
})
export class ExplorerootsComponent implements OnInit {

  constructor(
    private knowledgeServie: DataService,
    private loggerService: LoggerService,
  ) { }
  myColor= "#ccebff";
  products: any;
  dataLoading = true;
  imageLoaded = false;
  startLoadingImages = false;

  ngOnInit(): void {
    this.knowledgeServie.getKnowledgeBases().subscribe(
      (result:any)=>{
        console.log(result);
        this.products = result.bases;
        this.dataLoading = false;
        setTimeout(()=>{
          this.startLoadingImages = true;
        }, 50);
        setTimeout(()=>{
          this.imageLoaded = true;
        }, 3000);
      },
      error => {
        console.log(error);
      }
    )
    this.loggerService.logData("uf-exploreroots", this);
  }

}
