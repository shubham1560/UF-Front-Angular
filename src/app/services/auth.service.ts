import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  base_url = "http://127.0.0.1:8000/";
  // base_url = "https://uf-preprod.herokuapp.com/";  
  // base_url="https://database1560.herokuapp.com/";

  base_auth_url = `${this.base_url}authorization/`

  constructor(private httpService: HttpClient,
              private cookieService: CookieService
            ) { }

  url;
  body:{};
  header:{};

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

  // This method authenticates the backend for existing root users and get back the token for further requests
  login_root(username, password){
    const body = JSON.stringify({"username": username, "password": password});
    const url = `${this.base_auth_url}get_token/`;
    this.url = url;
    this.body = body;
    this.header = this.getHeader();
    return this.httpService.post(url, body, {headers: this.getHeader()});

  }

  // This method authenticates the backend for the google user and gets back the token for further request with authentication
  // This method takes the access token as parameter to get the token
  login_google(token: string) {
    const body = JSON.stringify({"access_token": token});
    const url = `${this.base_auth_url}create_user_google/`;
    this.body = body;
    this.url = url;
    this.header = this.getHeader();
    return this.httpService.post(url, body, {headers: this.getHeader()});
  }

  register_root_user(user: {}){
    const registration_body = {
      "username": user["email"],
      "password": user["password"],
      "first_name": user["first_name"],
      "last_name": user["last_name"],
    }

    const body = JSON.stringify(registration_body);
    const url = `${this.base_auth_url}create_user_sys/`;
    this.body = body;
    this.url = url;
    return this.httpService.post(url, body, {headers: this.getHeader()});
  }

  token_valid(token){
    const url = `${this.base_auth_url}token_valid/${token}/`;
    return this.httpService.get(url, {headers: this.getHeader()});
  }
  // For use to know if the user is logged in or nor, to manipulate logic
  isLoggedIn(): boolean{
    if(this.cookieService.get('token')){
      return true;
    }
    return false;
  }

  logoutUser(){
    this.cookieService.delete('token');
  }

  activate_account(token: string){
    const url = `${this.base_auth_url}activate_account/${token}`;
    return this.httpService.get(url, {headers: this.getHeader()});
  }


  resetPassword(token: string, password: string){
    const url = `${this.base_auth_url}reset_password/${token}`
    const body = JSON.stringify({'password': password});
    console.log(token, password);
    return this.httpService.post(url, body, {headers: this.getHeader()});
  }

  sendResetPassowordLink(email: string){
    const url = `${this.base_auth_url}send_password_reset_link/`
    const body = JSON.stringify({'email': email});
    this.body = body;
    this.url =url;
    console.log(url, body);
    return this.httpService.post(url, body, {headers: this.getHeader()});
  }

}
