import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlconfigService {

  base_url = environment.url;
  
  constructor(
    private cookieService: CookieService
  ) { }

  getUrl() {
    return this.base_url;
  }

  getFileUploadHeader() {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary',
      Authorization: `Token ${token}`,
    })
  }

  getHeader() {
    if (this.isLoggedIn()) {
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
    // const token = this.cookieService.get('token');
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    })
  }

  isLoggedIn(): boolean {
    // if (this.cookieService.get('token')) {
    if (localStorage.getItem('token')){
      // if (this.cookieService.get('token') == localStorage.getItem('token')) {
        return true;
      // }
    }
    return false;
  }

}
