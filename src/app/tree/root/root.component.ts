import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loggerService: LoggerService,
    private knowledgeService: DataService,
  ) { }

  colorArray = ["#ffcccc", "#ccffcc", "#ffccff", "#e8e3e8", "#ccffff", "#f2ffcc", "#e0ebeb", "#ecd9c6", "#d6e0f5", "#ffccf2"]

  myColor = this.colorArray[Math.floor(Math.random()*10)];
  categories;
  imageLoaded=false;
  startLoadingImages = false;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (result:any)=>{
        this.knowledgeService.getRelatedCategories(result.params.kb_base, result.params.kb_category).subscribe(
          (result:any) =>{
            this.categories = result.categories;
            setTimeout(()=>{
              this.startLoadingImages = true
            }, 50);
            setTimeout(()=>{
              this.imageLoaded = true;
            }, 3000);
          }
        )
        // console.log(result);
      }
    )
    this.loggerService.logData("uf-roots", this);  
  }

}
