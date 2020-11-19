import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community/community.service';
import { ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog } from '@angular/material/dialog';
import { EditorEditComponent } from '../editor-edit/editor-edit.component'

@Component({
  selector: 'app-ques-answer',
  templateUrl: './ques-answer.component.html',
  styleUrls: ['./ques-answer.component.scss']
})
export class QuesAnswerComponent implements OnInit {

  constructor(
    private community: CommunityService,
    private route: ActivatedRoute,
    private logger: LoggerService,
    public dialog: MatDialog
  ) { }

  question;
  comments;
  myObj;
  data;
  input_comment;
  question_id;
  owner;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.question_id = params.get('question_id');
        this.community.getQuestionAndAnswers(this.question_id).subscribe(
          (result:any) => {
            this.question = result.question;
            this.comments = result.comments;
            this.owner = result.question_owner;
            var len = this.question.question_details.length - 1;
            this.data = {
              time: 1552744582955,
              blocks: this.replacement(this.question.question_details.substring(1, len)),  //changing the data of string into array of objects
              version: "2.11.10"
            };

            this.initializeEditor();
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
          console.log(a.substring(j, i));
          c.push(JSON.parse(a.substring(j, i)));
          j = i + 1
        }
      }
    }
    c.push(JSON.parse(a.substring(j, a.length)));
    return c;
  }

  editor: EditorJS;

  initializeEditor() {
    this.editor = new EditorJS({

      holder: 'editorjs',

      data: this.data,

      placeholder: 'start typing here to add question details!',

      tools: {
        list: {
          class: List,
          inlineToolbar: true,
        },
        code: {
          class: CodeTool,
        },

      }
    })
  }

  saveComment(){
    this.community.postComment(this.question_id, 'question', this.input_comment).subscribe(
      result=>{
        this.comments.unshift(
          result
        )
      }
    )
  }

  editQuestion(){
    const dialogRef = this.dialog.open(EditorEditComponent, {
      // width: '250px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
