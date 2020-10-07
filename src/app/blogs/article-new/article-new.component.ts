import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import EditorJS from '@editorjs/editorjs';
import header from '@editorjs/header';
import rawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
// import checkList from '@editorjs/checklist';
import List from '@editorjs/list';
import embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Link from '@editorjs/link';
// import Warning from '@editorjs/warning';
import delimiter from '@editorjs/delimiter';
// import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesComponent } from '../courses/courses.component';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  constructor(
    private url: UrlconfigService,
    private knowledgeService: DataService,
    private routerService: ActivatedRoute,
    private userService: UserprofileService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private loggerService: LoggerService,
    private titleService: Title,
    public dialog: MatDialog
  ) { }

  editor: EditorJS
  data: any;
  // a;
  article;
  editorInitilized = false;
  state;

  ngOnInit() {
    this.titleService.setTitle("Add new article")
    // this.a = '{"type":"header","data":{"text":"Testing the hell out of it","level":2}},{"type":"image","data":{"file":{"url":"https://urbanfraud-test.s3.amazonaws.com/articleimages/compressed/bg_ZrcEzzJ.JPG","stretched":false,"withBackground":false,"withBorder":false},"caption":"","withBorder":false,"stretched":false,"withBackground":false}},{"type":"paragraph","data":{"text":"Well hello sir"}}'
    // this.replacement(this.a);

    this.userService.inGroup("Authors").subscribe(
      (response: Boolean) => {
        // console.log(response);
        if (response) {
          return true;
        }
        else {
          window.location.href = "welcome";
          return false;
        }
      }, error => {
        return false;
      }
    )


    this.routerService.paramMap.subscribe(
      params => {
        var article_id = params.get("id");
        if (article_id == '1') {
          this.data = {};
          // window.location.reload();
          this.initializeEditor();
          this.editorInitilized = true;
          setTimeout(()=>{
            console.clear();
          }, 1000)
        }
        else {
          this.knowledgeService.getArticleById(article_id).subscribe(
            (response: any) => {
              this.article = response;
              this.state = this.article.data.workflow
              this.id = article_id;
              var len = response.data.article_body.length - 1;
              this.data = {
                time: 1552744582955,
                blocks: this.replacement(response.data.article_body.substring(1, len)),  //changing the data of string into array of objects
                version: "2.11.10"
              };
              if (!this.editorInitilized) {
                this.initializeEditor();
                setTimeout(()=>{
                  console.clear();
                }, 1000)
      
              }
              // console.log(this);

            }, error => {
              // console.log(error);
            }
          )
        }
      }
    )
    this.loggerService.logData('uf-new-article', this);
  }

  id = '';  // if id =0, first save, otherwise populating the id from response

  initializeEditor() {
    this.editor = new EditorJS({

      holder: 'editorjs',

      data: this.data,

      placeholder: 'Let`s do some good together, Start by giving it a heading!',

      tools: {
        header: {
          class: header,
          inlineToolbar: ['link']
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `${this.url.base_url}attachment/add_image/`, // Your backend file uploader endpoint
            }
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        delimiter: {
          class: delimiter,
        },
        code: CodeTool,
        // table: {
        //   class: Table,
        //   inlineToolbar: true,
        //   config: {
        //     rows: 2,
        //     cols: 3,
        //   },
        // },
        // warning: {
        //   class: Warning,
        //   inlineToolbar: true,
        //   shortcut: 'CMD+SHIFT+W',
        //   config: {
        //     titlePlaceholder: 'Title',
        //     messagePlaceholder: 'Message',
        //   },
        // },
        // quote: {
        //   class: Quote,
        //   inlineToolbar: true,
        //   // shortcut: 'CMD+SHIFT+O',
        //   config: {
        //     quotePlaceholder: 'Enter a quote',
        //     captionPlaceholder: 'Quote\'s author',
        //   },
        // },

        embed: {
          class: embed,
          shortcut: 'CMD+SHIFT+O',

        },
        linkTool: {
          class: Link,
          config: {
            endpoint: `${this.url.base_url}attachment/fetch_url/`, // Your backend endpoint for url data fetching
          }
        },
        // checklist: {
        //   class: checkList,
        //   inlineToolbar: true,
        // },

        raw: rawTool,

      }

    })
  }

  updatingData;
  prevData = [];
  updateArticle(update) {
    this.editor.save().then((outputData:any) => {
      this.updatingData = true;
      if (outputData.blocks.length > 0 && !this.arrayEqual(this.prevData, outputData.blocks)) {
      // if (outputData.blocks.length > 0) {

        // this.prevData
        // console.log(this.prevData)
        // console.log(outputData.blocks);
        // console.log(this.arrayEqual(this.prevData, outputData.blocks));
        this.prevData = outputData.blocks;
        if (update) {
          this.knowledgeService.operateArticles(outputData, this.id).subscribe(
            (response: any) => {
              this.id = response;
              this.state = "draft";
              this.route.navigateByUrl('courses/article/' + this.id);
              this.updatingData = false;
              this.openSnackBar("The progress has been saved", '');
              // console.log(response);

            },
            (error) => {
              this.updatingData = false;
              this.openSnackBar("Please give a heading or title to the article, and try again", '');
            }
          )
        }
        else {
          this.knowledgeService.publishArticles(outputData, this.id).subscribe(
            (response: any) => {
              this.updatingData = false;
              this.state = 'review';
              this.openSnackBar("The article has been sent for review!!", '');

              // console.log(response);
            },
            (error) => {
              this.updatingData = false;
              this.openSnackBar("There seems to be a problem, please try again", '');
            }
          )
        }
      }
      else if(outputData.blocks.length == 0){
        this.updatingData = false;
        this.openSnackBar("Please add something to the article to save!", "");
        // console.log();
      }
      else if(this.arrayEqual(this.prevData, outputData.blocks)){
        this.openSnackBar("No change in article detected, change in spaces are not detected, please add in some words to get the change detection!!", '')
        this.updatingData = false;
      }
    }).catch((error) => {
      this.updatingData = false;
      console.log('Saving failed: ', error)
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }


  arrayEqual(ary1:any[],ary2:any[]){
    return (ary1.join('') == ary2.join(''));
  }


  addToCourse(){
    const dialogRef = this.dialog.open(CoursesComponent, {
      data: {article_id : this.id }
    });
    console.log("adding the modal");
  }

  // arrayEqual(a, b){
  //   if(a.length == b.length){
  //     for (let i = 0; i < a.length; i++){
  //       if (!this.objectsEqual(a[i], b[i])){
  //         return false;
  //       }
  //     }
  //   }

  // }

  // objectsEqual = (a1, a2) => {
  //   return a1.length === a2.length && a1.every((o, idx) => this.objectsEqual(o, a2[idx]));
  // }

}
