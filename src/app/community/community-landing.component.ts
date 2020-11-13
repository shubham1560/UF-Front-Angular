import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-community-landing',
  templateUrl: './community-landing.component.html',
  styleUrls: ['./community-landing.component.scss']
})
export class CommunityLandingComponent implements OnInit {

  constructor(
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    private routerService: ActivatedRoute
  ) { }

  routeSub;

  showsmallscreen;
  
  ngOnInit(): void {
    this.title.setTitle("Community - SortedTree");

    this.breakpointObserver.observe('(min-width: 768px)').subscribe(
      result => {
        this.showsmallscreen = result.matches;
      }
    )
    this.routeSub = this.route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        (document.querySelector('app-header') as HTMLElement).style.display = 'block';
        (document.querySelector('app-footer') as HTMLElement).style.display = 'block';
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
