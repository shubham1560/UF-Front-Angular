import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NsfwJsService } from 'src/app/services/nsfw/nsfw-js.service'
import { CommunityService } from 'src/app/services/community/community.service';
import { LoginpromptComponent } from 'src/app/auth/loginprompt/loginprompt.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-comm-new-question',
  templateUrl: './comm-new-question.component.html',
  styleUrls: ['./comm-new-question.component.scss']
})
export class CommNewQuestionComponent implements OnInit {
  routeSub: any;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private community: CommunityService,
    private nsfw: NsfwJsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  data = {
    blocks: [],
    time: 1605713362408,
    version: "2.18.0"
  };
  editor: EditorJS;
  question;
  root;
  path;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      param => {
        this.root = param.get('root');
        this.path = param.get('path');
        if (this.authService.isLoggedIn()) {
          if (!this.initialized) {
            this.initializeEditor();
          }
        }
        else {
          var url = '/community?root=' + this.root + "&path=" + this.path;
          this.router.navigateByUrl(url);
        }
      }
    )
    this.nsfw.loadModel();
  }



  headers = {
    'authorization': 'Token ' + this.authService.getToken(),
  }


  initialized = false;

  initializeEditor() {
    this.initialized = true;
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

  save() {
    if (this.authService.isLoggedIn()) {
      this.editor.save().then((outputData: any) => {
        var question_detail = {
          description: JSON.stringify(outputData.blocks),
          question: this.question,
          root: this.root,
          path: this.path
        }

        this.community.postQuestion(question_detail).subscribe(
          (result: any) => {
            // console.log(result);
            var url = "community/sq_qa/" + result.question_id + "/" + result.question_title;
            this.router.navigateByUrl(url);
          },
          error => {

          }
        )
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  openLoginPrompt() {
    const dialogRef = this.dialog.open(LoginpromptComponent);
  }

}
