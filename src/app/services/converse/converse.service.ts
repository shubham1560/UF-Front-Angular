import { Injectable } from '@angular/core';
import { UrlconfigService } from '../urlconfig.service';
import { HttpClient } from '@angular/common/http';
import { CacheserviceService } from '../cacheservice/cacheservice.service';

@Injectable({
  providedIn: 'root'
})
export class ConverseService {

  constructor(
    private urlService: UrlconfigService,
    private httpService: HttpClient,
    private cacheService: CacheserviceService,
  ) { }

  base_url = this.urlService.getUrl();
  base_support_url = `${this.base_url}history/`;
  called_url;

  getHeader(){
    return this.urlService.getHeader();
  }


  postConverse(record_id, record_table, comment){
    this.called_url = `${this.base_support_url}post/`;
    const body = {
      record_id: record_id,
      record_table: record_table,
      comment: comment
    }
    this.cacheService.deleteContaining("tickets/get/");
    this.cacheService.deleteContaining("ticket/");
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  getConverse(record_id, record_table){
    this.called_url = `${this.base_support_url}get/${record_id}/${record_table}/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }
}
