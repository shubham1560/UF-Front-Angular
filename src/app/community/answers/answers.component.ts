import { Component, OnInit, Input } from '@angular/core';
import { CommunityService } from 'src/app/services/community/community.service';
import { ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';


@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  constructor(
    private community: CommunityService,
    private route: ActivatedRoute
  ) { }

  @Input() answers;
  // data =[]
  question_id;
  ngOnInit(): void {
    console.log(this.answers);
    this.initializeEditor();
    this.route.paramMap.subscribe(
      params=>{
        this.question_id = params.get("question_id");
        
      }
    )
    
  }

  editor : EditorJS;

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
    this.editor.save().then((outputData: any) => {
      var question_detail = {
        description: JSON.stringify(outputData.blocks),
        question: this.question_id,
      }
      this.community.postAnswer(question_detail).subscribe(
        result => {
          // console.log(result);
          this.answers.unshift(result);
        }
      )

    })
  }



}
