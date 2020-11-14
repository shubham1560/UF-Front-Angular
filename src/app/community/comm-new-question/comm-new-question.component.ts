import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comm-new-question',
  templateUrl: './comm-new-question.component.html',
  styleUrls: ['./comm-new-question.component.scss']
})
export class CommNewQuestionComponent implements OnInit {
  routeSub: any;

  constructor(
    private route: Router,
    private routerService: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.events.subscribe((event) => {
      // console.log(event);

      if (event instanceof NavigationStart) {
        if (!event.url.startsWith("/community")) {
          // console.log("starts with community");
          (document.querySelector('app-header') as HTMLElement).style.display = 'block';
          (document.querySelector('app-footer') as HTMLElement).style.display = 'block';
        }
      }
    });

    this.routerService.paramMap.subscribe(
      params => {
        (document.querySelector('app-header') as HTMLElement).style.display = 'none';
        (document.querySelector('app-footer') as HTMLElement).style.display = 'none';
      }
    );
  }

}
