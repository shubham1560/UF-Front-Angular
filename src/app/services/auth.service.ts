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

  // This method authenticates the backend for existing root users and get back the token for further requests
  login_root(username, password){
    const body = JSON.stringify({"username": username, "password": password});
    const url = `${this.base_auth_url}get_token/`;
    return this.httpService.post(url, body, {headers: this.getUnauthenticatedHeader()});

  }

  // This method authenticates the backend for the google user and gets back the token for further request with authentication
  // This method takes the access token as parameter to get the token
  login_google(token: string) {
    const body = JSON.stringify({"access_token": token});
    const url = `${this.base_auth_url}create_user_google/`;
    console.log(url)
    return this.httpService.post(url, body, {headers: this.getUnauthenticatedHeader()});
  }


  // For use to know if the user is logged in or nor, to manipulate logic
  isLoggedIn(): boolean{
    if(this.cookieService.get('token')){
      return true;
    }
    return false;
  }


  activate_account(token: string){
    const url = `${this.base_auth_url}activate_account/${token}`;
    return this.httpService.get(url, {headers: this.getUnauthenticatedHeader()});
  }


  resetPassword(token: string, password: string){
    const url = `${this.base_auth_url}reset_password/${token}`
    const body = JSON.stringify({'password': password});
    console.log(token, password);
    return this.httpService.post(url, body, {headers: this.getUnauthenticatedHeader()});
  }

  sendResetPassowordLink(email: string){
    const url = `${this.base_auth_url}send_password_reset_link/`
    const body = JSON.stringify({'email': email});
    console.log(url, body);
    return this.httpService.post(url, body, {headers: this.getUnauthenticatedHeader()});
  }


}
