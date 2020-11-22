import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-browse-by-roots',
  templateUrl: './browse-by-roots.component.html',
  styleUrls: ['./browse-by-roots.component.scss']
})
export class BrowseByRootsComponent implements OnInit {

  constructor(
    private knowledge: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService
  ) { }

  roots;
  loading = false;
  paths
  articles
  selected_root;
  selected_path;
  selected_root_label;
  selected_path_label;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params => {
        this.selected_root = params.get('root')
        this.selected_path = params.get('path');
        if (params.get('root')) {
          this.knowledge.getRelatedCategories(params.get('root'), 'root', 'course').subscribe(
            (result:any) => {
              this.paths = result.categories;
              this.getSelectedLabel()
            }
          )
        }
        else {
          this.paths = [];
        }
        this.getBases();
      }
    )
    this.loggerService.logData("st-comm-select", this);
  }

  fetchData() {
    this.loading = true;
    this.getBases();
  }

  getBases() {
    this.knowledge.getKnowledgeBases().subscribe(
      result => {
        this.loading = false;
        this.roots = result;
        this.getSelectedLabel()
      },
      error => {
        this.loading = false;
      }
    )
  }

  getSelectedLabel(){
    if(this.roots){
      this.roots.bases.forEach(element => {
        if(element.id == this.selected_root){
          this.selected_root_label = element.title;
        }
      });
    }
    if(this.paths){
      this.paths.forEach(element => {
        if(element.id == this.selected_path){
          this.selected_path_label = element.label;
        }
      });
    }
  }

}
