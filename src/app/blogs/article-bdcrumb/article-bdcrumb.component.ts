import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article-bdcrumb',
  templateUrl: './article-bdcrumb.component.html',
  styleUrls: ['./article-bdcrumb.component.scss']
})
export class ArticleBdcrumbComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService,
    private KnowledgeService: DataService,
  ) { }
  

  isLoading = true;
  kb_base;
  kb_category;
  breadcrumb = ["Home", ""]
  breadcrumbLink = ["", ""]
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (route:any) => {
        this.isLoading = true;
        this.breadcrumb = ["Home", ""]
        this.breadcrumbLink = ["", ""]
        this.kb_category = route.get('category');
        if (this.kb_category != "root") {
          this.KnowledgeService.getBreadCrumbFromCategory(this.kb_category).subscribe(
            (result: any) => {
              console.log(result);
              this.kb_base = result.kb_base;
              this.breadcrumbLink[1] = "roots/" + this.kb_base + "/root";
              this.breadcrumb[1] = this.extractKnowledgeBaseName();
              result.labels.forEach((element, index, arr) => {
                this.breadcrumb[index + 2] = element;
                this.breadcrumbLink[index + 2] = "roots/" + this.kb_base + "/" + result.id[index];
              });
              this.isLoading = false;
            }
          )
        }else{
          this.isLoading = false;
        }
      }
    )
    this.loggerService.logData("article-bd", this);
  }

  navigateCrumb(index) {
    if(index != this.breadcrumbLink.length-1){
      this.router.navigateByUrl(this.breadcrumbLink[index])
    }
    // window.open();
  }

  extractKnowledgeBaseName() {
    var base = "";
    this.kb_base.split("-").forEach((element, index, arr) => {
      if (index != (arr.length - 1) || arr.length == 1) {
        base += element + " ";
      }
    })
    return base;
  }

}
