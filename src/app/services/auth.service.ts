import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  base_url = "http://127.0.0.1:8000/";
  //base_url = "https://uf-preprod.herokuapp.com/";
  base_auth_url = `${this.base_url}authorization/`

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

  // This method authenticates the backend for the google user and gets back the token for further request with authentication
  // This method takes the access token as parameter to get the token
  login_google(token: string) {
    const body = JSON.stringify({"access_token": token});
    const url = `${this.base_auth_url}create_user_google/`;
    return this.httpService.post(url, body, {headers: this.getUnauthenticatedHeader()});
  }

  isLoggedIn(): boolean{
    if(this.cookieService.get('token')){
      return true;
    }
    return false;
  }

}
