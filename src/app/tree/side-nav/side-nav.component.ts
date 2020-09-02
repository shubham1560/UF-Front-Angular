import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


interface Category {
  label: string;
  id: string;
  parent_catgory: string;
  parent_kb_base: string;
  children?: Category[];
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}


const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

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
  ) { 
    // console.log(this.tree_data);
  }

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  icon="menu";
  view = "course";
  viewChangeValid = true;
  initialized_kb_base = "";
  active_id = ""
  // categories = [];
  tree_data: Category[] ;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (result: any) => {
        this.active_id = result.params.kb_category;
        this.view = result.params.view;
        if(localStorage.getItem("view")){
          this.view = localStorage.getItem("view")
        }
        this.viewChangeValid = true;
        if(result.params.kb_category != "root"){
          this.viewChangeValid = false;
        }
        if (result.params.kb_base != this.initialized_kb_base){
          // console.log("change in base");
          this.knowledgeService.getCategoriesForSideNav(result.params.kb_base).subscribe(
            (result:any) =>{
              // this.categories = result;
              this.tree_data = result;
              this.dataSource.data = this.tree_data;
  
              // console.log(result);
            }
          )
        }
        
        this.initialized_kb_base = result.params.kb_base;
      }
    )
    this.loggerService.logData("uf-side-nav", this);
  }
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();

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
