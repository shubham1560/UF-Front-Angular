import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community/community.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-ques-answer',
  templateUrl: './ques-answer.component.html',
  styleUrls: ['./ques-answer.component.scss']
})
export class QuesAnswerComponent implements OnInit {

  constructor(
    private community: CommunityService,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { }

  question;
  myObj;
  data
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.community.getQuestionAndAnswers(params.get('question_id')).subscribe(
          result => {
            this.question = result;
            this.myObj = JSON.parse(this.question.question_details);
            // console.log(typeof(this.question.question_details));
            

            // var s = this.question.question_details.replace(/\\n/g, "\\n")
            //   .replace(/\\'/g, "\\'")
            //   .replace(/\\"/g, '\\"')
            //   .replace(/\\&/g, "\\&")
            //   .replace(/\\r/g, "\\r")
            //   .replace(/\\t/g, "\\t")
            //   .replace(/\\b/g, "\\b")
            //   .replace(/\\f/g, "\\f");
            // this.myObj = JSON.parse(s);

            var len = this.question.question_details.length - 1;
            this.data = {
              time: 1552744582955,
              blocks: this.replacement(this.question.question_details.substring(1, len)),  //changing the data of string into array of objects
              version: "2.11.10"
            };
          }
        )

      }
    )
    this.logger.logData("sqa", this);
  }


  replacement = function (a) {
    let b = []
    let c = []
    let j = 0
    for (var i = 0; i < a.length; i++) {
      if (a[i] == "{") {
        b.push("{");
      }
      if (a[i] == "}") {
        b.pop();
      }
      if (b.length == 0) {
        if (a[i] == ',') {
          c.push(JSON.parse(a.substring(j, i)));
          j = i + 1
        }
      }
    }
    c.push(JSON.parse(a.substring(j, a.length)));
    return c;
  }


}
