import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheserviceService {

  private requests: any = {};

  constructor() { }

  create(url: string, response: HttpResponse<any>) {
    this.requests[url] = response;
    this.delete(url);
  }

  read(url: string) {
    return this.requests[url];
  }

  delete(url: string) {
    setTimeout(() => {
      this.requests[url] = undefined;
      console.log("invalidated the url");
    }, 30*60*1000);
  }

  deleteAll() {
    this.requests = {};
  }

  getCache() {
    return this.requests;
  }

}
