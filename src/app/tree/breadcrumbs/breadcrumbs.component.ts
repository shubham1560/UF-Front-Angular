import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService,
    private KnowledgeService: DataService,
    private titleService: Title
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
        this.kb_base = route.get('kb_base');
        this.kb_category = route.get('kb_category');
        this.breadcrumb[1] = this.extractKnowledgeBaseName();
        this.titleService.setTitle(this.breadcrumb[1] + " - SortedTree");
        // if (this.kb_category == "root") {
        this.breadcrumbLink[1] = "roots/" + this.kb_base + "/root";
        // }else{
        if (this.kb_category != "root") {
          this.KnowledgeService.getBreadCrumbFromCategory(this.kb_category).subscribe(
            (result: any) => {
              // console.log(result);
              result.labels.forEach((element, index, arr) => {
                this.breadcrumb[index + 2] = element;
                this.breadcrumbLink[index + 2] = "roots/" + this.kb_base + "/" + result.id[index];
              });
              this.titleService.setTitle(this.breadcrumb[this.breadcrumb.length-1] +" - SortedTree" );
              this.isLoading = false;
            }
          )
        }else{
          this.isLoading = false;
        }
        // console.log(this)
      }
    )
    // this.loggerService.logData("uf-breadcrumbs", this);
  }

  navigateCrumb(index) {
    this.router.navigateByUrl(this.breadcrumbLink[index])
    // window.open();
  }

  extractKnowledgeBaseName() {
    var base = "";
    this.kb_base.split("-").forEach((element, index, arr) => {
      if (index != (arr.length - 1) || arr.length == 1) {
        base += element + " ";
      }
    })
    return base+("(All)");
  }
}
