import { Injectable } from '@angular/core';
import { UrlconfigService } from '../urlconfig.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  base_url =  this.urlService.getUrl();
  base_userprofile_url = `${this.base_url}userprofile/`
  
  constructor(private urlService: UrlconfigService,
      private httService: HttpClient,
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

}
