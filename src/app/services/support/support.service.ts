import { Injectable } from '@angular/core';
import { UrlconfigService } from '../urlconfig.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(
    private urlService: UrlconfigService,
    private httpService: HttpClient,
  ) { }

  base_url = this.urlService.getUrl();
  base_support_url = `${this.base_url}support/`;
  called_url;

  getHeader(){
    return this.urlService.getHeader();
  }

  createSupportRequest(feature, type){
    // console.log(feature);
    this.called_url = `${this.base_support_url}feature/post/`;
    const body = {"feature": feature, record_type: type};
    // console.log(body);
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

}
