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
      private httpService: HttpClient,
      private knowledgeService: DataService,
    ) { }

  header= this.urlService.getHeader()
  url: string;
  body: any ={};

  getUserData(){
    this.url = `${this.base_userprofile_url}get_user_data/`
    return this.httpService.get(this.url, {headers: this.header});
  }

  deleteUser(){
    this.url = `${this.base_userprofile_url}get_user_data/`
    this.body = {"delete": "true"};
    return this.httpService.post(this.url, this.body,  {headers: this.header})
  }

  getBookmarkedArticles(){
    this.url = `${this.knowledgeService.getKnowledgeUrl()}bookmarked_articles/`;
      return this.httpService.get(this.url, {headers:this.header} )
  }

  editUserData(user_data){
    this.url = `${this.base_userprofile_url}edit_user_data/`;
    const body = {"first_name": user_data.first_name ,
                  "last_name": user_data.last_name,
                  "about": user_data.about,
    };
    return this.httpService.post(this.url, body, {headers: this.header});
  }

  getUserReadArticle(){
    this.url = `${this.base_userprofile_url}get_user_activity/articles/`;
    return this.httpService.get(this.url, {headers: this.header});
  }

  getUserStartedCourse(){
    this.url = `${this.base_userprofile_url}get_user_activity/courses/`;
    return this.httpService
  }
}
