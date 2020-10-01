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

  getBookmarkedArticles(start, end){
    this.url = `${this.knowledgeService.getKnowledgeUrl()}bookmarked_articles/${start}/${end}/`;
      return this.httpService.get(this.url, {headers:this.header} )
  }

  editUserData(user_data){
    this.url = `${this.base_userprofile_url}edit_user_data/`;
    // const body = {"first_name": user_data.first_name ,
    //               "last_name": user_data.last_name,
    //               "about": user_data.about,
    // };
    const body = user_data;
    return this.httpService.post(this.url, body, {headers: this.header});
  }

  getUserReadArticle(start, end){
    this.url = `${this.base_userprofile_url}get_user_activity/articles/${start}/${end}/`;
    return this.httpService.get(this.url, {headers: this.header});
  }

  getUserStartedCourse(start, end){
    this.url = `${this.base_userprofile_url}get_user_activity/courses/${start}/${end}/`;
    return this.httpService.get(this.url, {headers: this.header});
  }

  addSubscriber(email){
    this.url = `${this.base_userprofile_url}add_subscriber/`;
    const body = {
      "email": email,
    }
    return this.httpService.post(this.url, body, {headers: this.header});
  }

  inGroup(group){
    this.url = `${this.base_userprofile_url}group/${group}/`;
    return this.httpService.get(this.url, {headers: this.header});
  }
}
