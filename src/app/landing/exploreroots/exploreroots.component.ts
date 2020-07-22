import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';

@Component({
  selector: 'app-exploreroots',
  templateUrl: './exploreroots.component.html',
  styleUrls: ['./exploreroots.component.scss']
})
export class ExplorerootsComponent implements OnInit {

  constructor(
    private knowledgeServie: DataService,
  ) { }
  myColor= "lightgray";
  products: any;

  ngOnInit(): void {
    this.knowledgeServie.getKnowledgeBases().subscribe(
      (result:any)=>{
        console.log(result);
        this.products = result.bases;
      },
      error => {
        console.log(error);
      }
    )
  }

}
