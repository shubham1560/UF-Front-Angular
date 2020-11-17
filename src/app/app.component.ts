import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AuthService } from './services/authservice/auth.service';
import { Observable } from 'rxjs';
import { slideInAnimation } from './app.animation';
import { LoggerService } from './services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'uf-front';
  routeSub: any;

  constructor(
    private route: Router,
    private routerService: ActivatedRoute,
  ) { }

  mainHeader = true;
  commHeader = true;

  onActivate(event) {
    // let scrollToTop = window.setInterval(() => {
    //   let pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos - 20); // how far to scroll on each step
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 16);
  }

  ngOnInit() {
    this.routeSub = this.route.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        if (!event.url.startsWith("/community")) {
          this.mainHeader = true;
          this.commHeader = false;
          // (document.querySelector('app-header') as HTMLElement).style.display = 'block';
          (document.querySelector('app-footer') as HTMLElement).style.display = 'block';
        }
        else{
          this.commHeader = true;
          this.mainHeader = false;
        }
      }
    });

    this.routerService.paramMap.subscribe(
      params => {
        // (document.querySelector('app-header') as HTMLElement).style.display = 'none';
        (document.querySelector('app-footer') as HTMLElement).style.display = 'none';
      }
    );


  }

}
