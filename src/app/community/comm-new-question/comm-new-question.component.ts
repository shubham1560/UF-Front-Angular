import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { ProfanityComponent } from 'src/app/shared/profanity/profanity.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { MatDialog } from '@angular/material';
import { NsfwJsService } from 'src/app/services/nsfw/nsfw-js.service'


@Component({
  selector: 'app-comm-new-question',
  templateUrl: './comm-new-question.component.html',
  styleUrls: ['./comm-new-question.component.scss']
})
export class CommNewQuestionComponent implements OnInit {
  routeSub: any;

  constructor(
    private authService: AuthService,
    private knowledgeService: DataService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private nsfw: NsfwJsService
  ) { }

  data;
  editor: EditorJS;
  question;

  ngOnInit(): void {
    this.initializeEditor();
    // this.routeSub = this.route.events.subscribe((event) => {
    //   // console.log(event);

    //   if (event instanceof NavigationStart) {
    //     if (!event.url.startsWith("/community")) {
    //       // console.log("starts with community");
    //       (document.querySelector('app-header') as HTMLElement).style.display = 'block';
    //       (document.querySelector('app-footer') as HTMLElement).style.display = 'block';
    //     }
    //   }
    // });

    // this.routerService.paramMap.subscribe(
    //   params => {
    //     (document.querySelector('app-header') as HTMLElement).style.display = 'none';
    //     (document.querySelector('app-footer') as HTMLElement).style.display = 'none';
    //   }
    // );

    this.nsfw.loadModel();
  }



  headers = {
    'authorization': 'Token ' + this.authService.getToken(),
  }


  initializeEditor() {
    this.editor = new EditorJS({

      holder: 'editorjs',

      data: this.data,

      placeholder: 'start typing here to add question details!',

      // autofocus: true,

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

  save(){
    this.editor.save().then((outputData: any) => {
      var stripped_data = this.htmlStrip(outputData);
      // console.log(outputData, this.question);
      this.knowledgeService.checkProfanity(stripped_data).subscribe(
        (result: any) => {
          if (result.profane) {
            this.dialog.open(ProfanityComponent, {
              data: { data: result }
            })
            this.openSnackBar("This question couldn't pass the profanity check", '');
          }
          else {
          }
        }, error => {
        }
      )

    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }


  htmlStrip(data) {
    var data_to_check = {};
    var changedData = []
    // console.log(data);
    changedData.push({
      "data": { "level": 2, "text": this.question },
      "type": "header"
    })
    data.blocks.forEach(element => {
      // console.log(element);
      if (element.type == 'header') {
        changedData.push(
          {
            "data": { "level": element.data.level, "text": element.data.text.replace(/<[^>]*>?/gm, '').replace("nbsp", " ") },
            "type": element.type
          }
        )
      }
      else if (element.type == 'paragraph') {
        changedData.push(
          {
            "data": { "text": element.data.text.replace(/<[^>]*>?/gm, ' ').replace("nbsp", " ") },
            "type": element.type
          }
        )
      }
      else if (element.type == 'list') {
        changedData.push(
          {
            "data": { "items": [element.data.items[0].replace(/<[^>]*>?/gm, ' ').replace("nbsp", " ")], "style": element.style },
            "type": element.type
          }
        )
      }
      else {
        changedData.push(element);
      }
    });

    data_to_check = {
      "time": "1604520019453",
      "blocks": changedData,
      "version": "2.18.0"
    }
    // console.log(changedData);
    return data_to_check;
  }
}
