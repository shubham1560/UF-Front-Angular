import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
  selector: 'app-comm-header',
  templateUrl: './comm-header.component.html',
  styleUrls: ['./comm-header.component.scss']
})
export class CommHeaderComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    private routerService: ActivatedRoute,
    private authService: AuthService
  ) { }

  routeSub;
  isLoggedIn;
  hidesmallscreen;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.breakpointObserver.observe('(min-width: 768px)').subscribe(
      result => {
        this.hidesmallscreen = result.matches;
      }
    )
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
        // (document.querySelector('app-header') as HTMLElement).style.display = 'none';
        // (document.querySelector('app-footer') as HTMLElement).style.display = 'none';
      }
    );
  }


  logout() {
    this.authService.logoutUser();
  }


}
