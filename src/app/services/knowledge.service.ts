import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  base_url = "http://127.0.0.1:8000/";

  base_knowledge_url = `${this.base_url}knowledge/`

  constructor(private httpService: HttpClient,
              private cookieService: CookieService
          ) { }


  getUnauthenticatedHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getAuthenticationHeader() {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization : `Token ${token}`,
    })
  }

  getAllArticles(){
    const url = `${this.base_knowledge_url}articles/`;
    return this.httpService.get(url, {headers: this.getUnauthenticatedHeader()});
  }

  getRelatedComments(id:string){
    const url = `${this.base_knowledge_url}articles/${id}/comments/`;
    return this.httpService.get(url, {headers: this.getUnauthenticatedHeader()});
  }


}
