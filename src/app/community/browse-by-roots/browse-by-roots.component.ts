import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';

@Component({
  selector: 'app-browse-by-roots',
  templateUrl: './browse-by-roots.component.html',
  styleUrls: ['./browse-by-roots.component.scss']
})
export class BrowseByRootsComponent implements OnInit {

  constructor(
    private knowledge: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  roots;
  loading = false;
  paths
  articles
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params => {

        // if (params.get('path')) {
        //   this.knowledge.getArticlesInPath(params.get('path')).subscribe(
        //     result => {
        //       this.articles = result
        //     }
        //   )
        // }
        // else {
        //   this.articles = [];
        // }

        // if (params.get('path').)


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
  }

  fetchData() {
    this.loading = true;
    // console.log("fetch kr na bhai data!");
    this.getBases();
  }

  getBases() {
    this.knowledge.getKnowledgeBases().subscribe(
      result => {
        this.loading = false;
        this.roots = result;
      },
      error => {
        this.loading = false;
      }
    )
  }

}
