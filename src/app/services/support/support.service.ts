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

  createSupportRequest(support_data, type){
    // console.log(feature);
    this.called_url = `${this.base_support_url}support/post/`;
    const body = {"data": support_data, record_type: type};
    // console.log(body);
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  editSupportRequest(support_data, type){
    this.called_url = `${this.base_support_url}support/edit/`;
    const body = {"data": support_data, record_type: type};
    // console.log(body);
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  getSupportRequests(){
    this.called_url = `${this.base_support_url}tickets/get/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  getSupportTicketDetails(ticket_id, ticket_type){
    this.called_url = `${this.base_support_url}ticket/${ticket_id}/${ticket_type}/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  getAttachments(ticket_type, ticket_id){
    this.called_url = `${this.base_url}attachment/get_image/${ticket_type}/${ticket_id}/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  postAttachmentAction(action, action_config){
    this.called_url = `${this.base_url}attachment/attachment/post/`;
    const body = {
      action: action,
      config: action_config
    }
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }
}
