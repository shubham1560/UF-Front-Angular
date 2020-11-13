import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse-by-roots',
  templateUrl: './browse-by-roots.component.html',
  styleUrls: ['./browse-by-roots.component.scss']
})
export class BrowseByRootsComponent implements OnInit {

  constructor(
    private knowledge: DataService,
    private route: ActivatedRoute
  ) { }

  roots;
  loading = false;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params =>{
        // console.log(params);
        
      }
    )
  }

  fetchData(){
    this.loading = true;
    // console.log("fetch kr na bhai data!");
    this.getBases();
  }

  getBases(){
    this.knowledge.getKnowledgeBases().subscribe(
      result=>{
        this.loading = false;
        this.roots = result;
      },
      error=>{
        this.loading = false;
      }
    )
  }
}
