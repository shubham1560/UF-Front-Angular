import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'uf-front';

  constructor(private route: ActivatedRoute,
    private authService: AuthService) {
  }
  loadFooter: boolean = true;

  ngOnInit() {
    var urlArray = window.document.URL.split("/");
    this.loadFooter = !urlArray.includes("auth");
  }

}
