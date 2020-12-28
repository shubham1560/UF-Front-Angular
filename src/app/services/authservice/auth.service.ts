import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { CookieService } from 'ngx-cookie-service';
import { UrlconfigService } from '../urlconfig.service';
import { CacheserviceService } from '../cacheservice/cacheservice.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // base_url = "http://127.0.0.1:8000/";
  // base_url = "https://uf-preprod.herokuapp.com/";  
  // base_url="https://database1560.herokuapp.com/";


  constructor(private httpService: HttpClient,
    private cookieService: CookieService,
    private urlService: UrlconfigService,
    private cacheService: CacheserviceService
  ) { }

  base_url = this.urlService.getUrl();

  base_auth_url = `${this.base_url}authorization/`


  url;
  body: {};
  header:{};

  getToken(){
    return localStorage.getItem('token');
    // return this.cookieService.get('token');
  }

  getHeader() {
    return this.urlService.getHeader();
  }

  getFileUploadHeader(){
    return this.urlService.getFileUploadHeader();
  }

  getLoggedInUserDetail() {
    this.header = this.getHeader();
    this.url = `${this.base_auth_url}token_get_user`;
    return this.httpService.get(this.url, { headers: this.header });
  }

  // This method authenticates the backend for existing root users and get back the token for further requests
  login_root(username, password) {
    const body = JSON.stringify({ "username": username, "password": password });
    const url = `${this.base_auth_url}get_token/`;
    this.url = url;
    this.body = body;
    this.header = this.getHeader();
    // console.log(this);
    return this.httpService.post(url, body, { headers: this.getHeader() });

  }

  login_facebook(token: string){
    const body = JSON.stringify({ "access_token": token });
    const url = `${this.base_auth_url}create_user_facebook/`;
    this.body = body;
    this.url = url;
    this.header = this.getHeader();
    return this.httpService.post(url, body, { headers: this.getHeader() });
  }

  get_moderators(){
    const url = `${this.base_auth_url}sys_user/moderators/`;
    return this.httpService.get(url, {headers: this.getHeader()});
  }

  // This method authenticates the backend for the google user and gets back the token for further request with authentication
  // This method takes the access token as parameter to get the token
  login_google(token: string) {
    const body = JSON.stringify({ "access_token": token });
    const url = `${this.base_auth_url}create_user_google/`;
    this.body = body;
    this.url = url;
    this.header = this.getHeader();
    return this.httpService.post(url, body, { headers: this.getHeader() });
  }

  register_root_user(user: {}) {
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
    return this.httpService.post(url, body, { headers: this.getHeader() });
  }

  token_valid(token) {
    const url = `${this.base_auth_url}token_valid/${token}/`;
    return this.httpService.get(url, { headers: this.getHeader() });
  }
  // For use to know if the user is logged in or nor, to manipulate logic
  isLoggedIn(): boolean {
    return this.urlService.isLoggedIn();
  }

  logoutUser() {
    this.cookieService.delete('token');
    localStorage.removeItem("token");
    localStorage.removeItem("t_token");
    window.window.location.href = "welcome";
  }

  activate_account(token: string) {
    const url = `${this.base_auth_url}activate_account/${token}`;
    return this.httpService.get(url, { headers: this.getHeader() });
  }


  resetPassword(token: string, password: string) {
    const url = `${this.base_auth_url}reset_password/${token}`
    const body = JSON.stringify({ 'password': password });
    // console.log(token, password);
    return this.httpService.post(url, body, { headers: this.getHeader() });
  }

  sendResetPassowordLink(email: string) {
    const url = `${this.base_auth_url}send_password_reset_link/`
    const body = JSON.stringify({ 'email': email });
    this.body = body;
    this.url = url;
    // console.log(url, body);
    return this.httpService.post(url, body, { headers: this.getHeader() });
  }

  resendActivationLink(email){
    const url = `${this.base_auth_url}resend_activation_link/${email}/`;
    return this.httpService.get(url, {headers: this.getHeader()});
  }

  resetPaswordLoggedIn(userdata){
    const url = `${this.base_auth_url}sys_user/reset_password_logged_in/`;
    const body = userdata;
    return this.httpService.post(url, body, {headers: this.getHeader()});
  }

  getUsers(){
    const url = `${this.base_auth_url}users/`;
    return this.httpService.get(url, {headers: this.getHeader()});
  }

  getImpersonationToken(username){
    const url = `${this.base_auth_url}get_impersonation_token/`;
    const body = {
      "username": username
    }
    return this.httpService.post(url, body, {headers: this.getHeader()});
  }

  getGroups(){
    const url = `${this.base_auth_url}sys_user/groups/user/`;
    return this.httpService.get(url, {headers: this.getHeader()});
  }

  addGroupUser(user, groupsToAdd){
    const url = `${this.base_auth_url}sys_user/groups/user/`;
    this.cacheService.deleteInstant(`${this.base_auth_url}users/`);
    this.cacheService.deleteInstant(url);
    const body = {
      "user": user,
      "groupArray": groupsToAdd
    }
    return this.httpService.post(url, body, {headers: this.getHeader()});
  }
}
