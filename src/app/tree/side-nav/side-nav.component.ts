import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: DataService,
    private loggerService: LoggerService,

  ) { }

  icon="menu";
  view = "course";
  viewChangeValid = true;
  categories = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (result: any) => {

        this.view = result.params.view;
        if(localStorage.getItem("view")){
          this.view = localStorage.getItem("view")
        }
        this.viewChangeValid = true;
        if(result.params.kb_category != "root"){
          this.viewChangeValid = false;
        }
        this.knowledgeService.getCategoriesForSideNav(result.params.kb_base).subscribe(
          (result:any) =>{
            this.categories = result;
            // console.log(result);
          }
        )
      }
    )
    this.loggerService.logData("uf-side-nav", this);
  }

  changeView(changedView){
    console.log(changedView);
    if(changedView=="tree"){
      this.view = "tree";
    }
    else if(changedView=="course"){
      this.view = "course";
    }
    localStorage.setItem("view", this.view);
  }

  // openNav(){
  //   this.icon = "menu";
  //   document.getElementById("sidebar").classList.toggle("active")
  //   if(document.getElementById("sidebar").classList["value"] == "active"){
  //     this.icon = "close";
  //   }
  // }
}
