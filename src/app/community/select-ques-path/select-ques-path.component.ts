import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-select-ques-path',
  templateUrl: './select-ques-path.component.html',
  styleUrls: ['./select-ques-path.component.scss']
})
export class SelectQuesPathComponent implements OnInit {

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
  selected_root: string;
  selected_path: string;
  selected_root_label;
  selected_path_label;
  ngOnInit(): void {
    this.getBases()
    this.route.queryParamMap.subscribe(
      params => {
        this.selected_root = params.get('root');
        this.selected_path = params.get('path');
        
        if(this.roots){
          this.fetchRootLabelFromId(this.selected_root);
        }
        if (params.get('root')) {
          this.knowledge.getRelatedCategories(params.get('root'), 'root', 'course').subscribe(
            (result: any) => {
              this.paths = result.categories;
              if (this.selected_path) {
                this.fetchPathLabelFromId(this.selected_path);
              }else{
                this.selected_path_label = undefined
              }
            }
          )
        }
        else {
          this.paths = [];
        }
      }
    )
    this.loggerService.logData("st-ques-select", this);
  }

  fetchData() {
    this.loading = true;
    this.getBases();
  }

  getBases() {
    this.knowledge.getKnowledgeBases().subscribe(
      (result: any) => {
        this.loading = false;
        this.roots = result.bases;
        if (this.selected_root) {
          this.fetchRootLabelFromId(this.selected_root);
        }
      },
      error => {
        this.loading = false;
      }
    )
  }

  selectRoot(root_id) {
    // this.selected_root_label = root_label;
    this.router.navigate(['/community', 'new_question'], { queryParams: { root: root_id } });
  }

  selectedPath(path_id) {
    // this.selected_path_label = path_label;
    this.router.navigate(['/community', 'new_question'], { queryParams: { path: path_id }, queryParamsHandling: "merge" });
  }

  fetchPathLabelFromId(path_id) {
    this.selected_path_label = undefined
    this.paths.forEach(element => {
      if (element.id == path_id) {
        // console.log(element.id, path_id)
        this.selected_path_label = element.label;
      }
    });
  }

  fetchRootLabelFromId(root_id) {
    this.selected_root_label = undefined
    this.roots.forEach(element => {
      if (element.id == root_id) {
        // console.log(element.id, root_id)
        this.selected_root_label = element.title;
      }
    });
  }
}
