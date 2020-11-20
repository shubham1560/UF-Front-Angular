import { Component, OnInit, Input } from '@angular/core';
import { CommunityService } from 'src/app/services/community/community.service';
import { ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import { EditorEditComponent } from '../editor-edit/editor-edit.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  constructor(
    private community: CommunityService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  @Input() answers;
  question_id;
  post_answer_disabled;

  json_answers = [];


  ngOnInit(): void {
    // console.log(this.answers);
    this.initializeEditor();
    this.route.paramMap.subscribe(
      params => {
        this.question_id = params.get("question_id");
        this.changeToJsonAnswer();
        // this.changeToJsonAnswer();
      }
    )

  }

  editor: EditorJS;


  initializeEditor() {
    this.editor = new EditorJS({

      holder: 'editorjsanswer',

      // data: this.data,

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


  save() {
    this.post_answer_disabled = true;
    this.editor.save().then((outputData: any) => {
      if (outputData.blocks.length > 0) {
        var question_detail = {
          description: JSON.stringify(outputData.blocks),
          question: this.question_id,
        }
        this.community.postAnswer(question_detail).subscribe(
          result => {
            this.answers.unshift(result);
            this.changeToJsonAnswer();
            this.post_answer_disabled = false;
            outputData.blocks = []; 
          },
          error => {
            this.post_answer_disabled = false;
          }
        )
      }
      else {
        console.log("insert something");
        this.post_answer_disabled = false;
      }
    })


  }


  changeToJsonAnswer() {
    this.json_answers = [];
    this.answers.forEach(element => {
      // console.log(element);
      this.json_answers.push({
        "id": element.id,
        "owner": element.owner,
        "answer": this.replacement(element.answer.substring(1, element.answer.length - 1)),
        "sys_created_by": element.sys_created_by,
        "comments": element.comments,
        "sys_created_on": element.sys_created_on,
        "update_count": element.update_count,
        "sys_updated_on": element.sys_updated_on,
      })
    });

  }

  editAnswer(block_data, answer_id) {
    const dialogRef = this.dialog.open(EditorEditComponent, {
      minWidth: '280px',
      data: {
        editor_data: {
          "time": '1232qads',
          'blocks': block_data,
          "version": '1.19'
        },
        table_id: answer_id,
        table_name: 'answer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.block_data) {
        // console.log(result);
        this.answers.forEach(element => {
          if (element.id == result.table_id) {
            element.answer = result.block_data;
          }
        });
        this.changeToJsonAnswer();
      }
    });
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
