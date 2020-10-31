import { Injectable } from '@angular/core';
import { UrlconfigService } from '../urlconfig.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConverseService {

  constructor(
    private urlService: UrlconfigService,
    private httpService: HttpClient,
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
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }
}
