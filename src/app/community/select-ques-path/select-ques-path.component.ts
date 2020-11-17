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
  selected_root;
  selected_path;
  
  ngOnInit(): void {
    this.getBases()
    this.route.queryParamMap.subscribe(
      params => {
        this.selected_root = params.get('root')
        this.selected_path = params.get('path');
        if (params.get('root')) {
          this.knowledge.getRelatedCategories(params.get('root'), 'root', 'course').subscribe(
            (result:any) => {
              this.paths = result.categories;
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
      (result:any) => {
        this.loading = false;
        this.roots = result.bases;
      },
      error => {
        this.loading = false;
      }
    )
  }

  selectRoot(root_id){
    // this.route.
    console.log("yolo");
    
    this.router.navigate(['/community', 'new_question'], { queryParams: { root: root_id } });
  }


}
