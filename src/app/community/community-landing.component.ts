import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthService } from '../services/authservice/auth.service';

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
    private routerService: ActivatedRoute,
    private authService: AuthService
  ) { }

  routeSub;
  isLoggedIn;
  showsmallscreen;
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
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


  logout(){
    this.authService.logoutUser();
  }
}
