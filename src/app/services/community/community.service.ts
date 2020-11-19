import { Injectable } from '@angular/core';
import { AuthService } from '../authservice/auth.service';
import { UrlconfigService } from '../urlconfig.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(
    private auth: AuthService,
    private urlService: UrlconfigService,
    private httpService: HttpClient
  ) { }

  base_url = this.urlService.getUrl();

  base_community_url = `${this.base_url}community/`;

  called_url = ''

  getHeader() {
    return this.auth.getHeader();
  }

  getQuestions(root, path, article, start, end) {
    this.called_url = `${this.base_community_url}question?root=${root}&path=${path}&article=${article}&start=${start}&end=${end}`;
    return this.httpService.get(this.called_url, { headers : this.getHeader()});
  }

  postQuestion(root, path, data){
    this.called_url = `${this.base_community_url}question/`;
    const body = data;
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});

  }

  getQuestionAndAnswers(question_id){
    this.called_url = `${this.base_community_url}question/${question_id}`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  postComment(table_id, table_name, comment){
    this.called_url = `${this.base_community_url}comment/`;
    const body = {
      table_id: table_id,
      table_name: table_name,
      comment: comment
    }
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }
}
