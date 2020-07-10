import { Injectable } from '@angular/core';
import { UrlconfigService } from '../urlconfig.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../knowledgeservice/knowledge.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  base_url =  this.urlService.getUrl();
  base_userprofile_url = `${this.base_url}userprofile/`
  
  constructor(private urlService: UrlconfigService,
      private httService: HttpClient,
      private knowledgeService: DataService,
    ) { }

  header= this.urlService.getHeader()
  url: string;
  body: any ={};

  getUserData(){
    this.url = `${this.base_userprofile_url}get_user_data/`
    return this.httService.get(this.url, {headers: this.header});
  }

  deleteUser(){
    this.url = `${this.base_userprofile_url}get_user_data/`
    this.body = {"delete": "true"};
    return this.httService.post(this.url, this.body,  {headers: this.header})
  }

  getBookmarkedArticles(){
    this.url = `${this.knowledgeService.getKnowledgeUrl()}bookmarked_articles/`;
      return this.httService.get(this.url, {headers:this.header} )
  }
}
