import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { CacheserviceService } from '../../services/cacheservice/cacheservice.service';
import { HttpResponse } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-exploreroots',
  templateUrl: './exploreroots.component.html',
  styleUrls: ['./exploreroots.component.scss']
})
export class ExplorerootsComponent implements OnInit {

  constructor(
    private knowledgeServie: DataService,
    private authService: AuthService,
    private loggerService: LoggerService,
    private cacheService: CacheserviceService,
    private urlService: UrlconfigService,
    private titleService: Title
    // private urlService: 
  ) { }
  myColor = "#8dbcaa";
  products: any;
  dataLoading = true;
  imageLoaded = false;
  startLoadingImages = false;
  isLoggedIn = false;

  ngOnInit(): void {
    const cachedResponse: HttpResponse<any> = this.cacheService.read(`${this.urlService.base_url}knowledge/knowledge_base/get_knowledge_bases/`);
    this.titleService.setTitle("Home - SortedTree");
    if (cachedResponse) {
      this.products = cachedResponse.body.bases;
      this.dataLoading = false;
      // console.log("from cache");
    }
    else {
      setTimeout(() => {

        this.knowledgeServie.getKnowledgeBases().subscribe(
          (result: any) => {
            // console.log(result);
            this.products = result.bases;
            this.dataLoading = false;
            // setTimeout(() => {
            //   this.startLoadingImages = true;
            // }, 50);
            // setTimeout(() => {
            //   this.imageLoaded = true;
            // }, 500);
          },
          error => {
            // console.log(error);
          }
        )

      }, 1000);
    }
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.loggerService.logData("uf-exploreroots", this);
  }

}
