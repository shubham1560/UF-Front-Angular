import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // base_url = "http://127.0.0.1:8000/"; //local
  //base_url = "https://uf-preprod.herokuapp.com/";  //preprod
  base_url = "https://database1560.herokuapp.com/"  //dev
  // base_url = ""
  base_knowledge_url = `${this.base_url}knowledge/`

  called_url: string;

  constructor(private httpService: HttpClient,
    private cookieService: CookieService,
    private authSerivce: AuthService,
  ) { }

  getHeader() {
    if (this.authSerivce.isLoggedIn()) {
      return this.getAuthenticationHeader();
    }
    return this.getUnauthenticatedHeader()
  }


  getUnauthenticatedHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getAuthenticationHeader() {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    })
  }

  getAllArticles() {
    const url = `${this.base_knowledge_url}articles/`;
    this.called_url = url
    return this.httpService.get(url, { headers: this.getHeader() });
  }

  getRelatedComments(id: string) {
    const url = `${this.base_knowledge_url}articles/${id}/comments/`;
    this.called_url = url;
    return this.httpService.get(url, { headers: this.getHeader() });
  }

  getPaginatedArticles(start: number, end: number) {
    const url = `${this.base_knowledge_url}articles/${start}/${end}/`;
    this.called_url = url;
    return this.httpService.get(url, { headers: this.getHeader() });
  }


}
