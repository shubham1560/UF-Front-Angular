import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse-questions',
  templateUrl: './browse-questions.component.html',
  styleUrls: ['./browse-questions.component.scss']
})
export class BrowseQuestionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params=>{
        // console.log(params);
      }
    )
  }

}
