import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlconfigService {

  base_url = "http://127.0.0.1:8000/";           //local
  // base_url="https://database1560.herokuapp.com/";          //dev
  // base_url = "https://uf-preprod.herokuapp.com/";          //preprod


  constructor(
    private cookieService: CookieService
  ) { }

  getUrl(){
    return this.base_url;
  }

  getFileUploadHeader(){
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary',
      Authorization : `Token ${token}`,
    })
  }

  getHeader(){
    if (this.isLoggedIn()){
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
      Authorization : `Token ${token}`,
    })
  }

  isLoggedIn(): boolean{
    if(this.cookieService.get('token')){
      return true;
    }
    return false;
  }

}
