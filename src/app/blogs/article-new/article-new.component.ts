import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import EditorJS from '@editorjs/editorjs';
import header from '@editorjs/header';
import rawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import embed from '@editorjs/embed';
import Link from '@editorjs/link';
import delimiter from '@editorjs/delimiter';
import CodeTool from '@editorjs/code';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesComponent } from '../courses/courses.component';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { ArticleTagComponent } from '../article-tag/article-tag.component';
// import {LayoutModule} from '@angular/cdk/layout';
import { ProfanityComponent } from 'src/app/shared/profanity/profanity.component';

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
    public dialog: MatDialog,
    private authService: AuthService,
    
  ) { }

  editor: EditorJS
  data: any;
  article;
  editorInitilized = false;
  state;
  owner = false
  isLoading = true;
  title;
  description = '';
  showArticleTags = false;
  param_article = '';

  private routeSub: any;

  ngOnInit() {

    //to show header and footer when the route changes
    this.routeSub = this.route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        (document.querySelector('app-header') as HTMLElement).style.display = 'block';
        (document.querySelector('app-footer') as HTMLElement).style.display = 'block';

      }
    });

    this.checkForAuthor();

    this.routerService.paramMap.subscribe(
      params => {

        (document.querySelector('app-header') as HTMLElement).style.display = 'none';
        (document.querySelector('app-footer') as HTMLElement).style.display = 'none';


        var article_id = params.get("id");
        this.param_article = article_id;
        if (this.authService.isLoggedIn()) {
          if (article_id == '1') {
            this.titleService.setTitle("Add new article - SortedTree")
            this.data = {};
            this.owner = true;
            this.isLoading = true;
            this.initializeEditor();
            this.editorInitilized = true;
          }
          else {
            this.knowledgeService.getArticleById(article_id).subscribe(
              (response: any) => {
                this.showArticleTags = true;
                this.article = response;
                this.description = this.article.data.description;
                this.title = this.article.data.title;
                this.titleService.setTitle("Editing: " + this.article.data.title + " - SortedTree")
                this.owner = response.owner;
                if (!this.owner) {
                  window.location.href = "";
                } else {
                  this.isLoading = false;
                }
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
                }
              }, error => {
                // console.log(error);
                this.route.navigateByUrl('courses/article/1');

              }
            )
          }
        }
        else {
          this.route.navigate(["welcome"]);
        }
      }
    )
    this.loggerService.logData('uf-new-article', this);
  }

  id = '';  // if id =0, first save, otherwise populating the id from response
  headers = {
    'authorization': 'Token ' + this.authService.getToken(),
  }

  initializeEditor() {
    this.editor = new EditorJS({

      holder: 'editorjs',

      data: this.data,

      placeholder: 'Let`s do some good together, type away!',

      // autofocus: true,

      tools: {
        header: {
          class: header,
          shortcut: 'CMD+SHIFT+H',
          inlineToolbar: ['link']
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `${this.url.base_url}attachment/add_image/`, // Your backend file uploader endpoint
            },
            additionalRequestHeaders: this.headers
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        delimiter: {
          class: delimiter,
        },
        code: {
          class: CodeTool,
        },
        embed: {
          class: embed,
          shortcut: 'CMD+SHIFT+O',

        },
        linkTool: {
          class: Link,
          shortcut: 'CMD+SHIFT+L',
          config: {
            endpoint: `${this.url.base_url}attachment/fetch_url/`, // Your backend endpoint for url data fetching
          }
        },
        raw: rawTool,
      }
    })
  }

  updatingData;
  prevData = [];


  checkProfanity(data) {
    this.knowledgeService.checkProfanity(data).subscribe(
      result => {
        // console.log(result);
      },
      error => {

      }
    )
  }


  updateArticle(update) {
    this.editor.save().then((outputData: any) => {
      this.updatingData = true;
      if (outputData.blocks.length > 0 && !this.arrayEqual(this.prevData, outputData.blocks) && this.title != '') {
        this.prevData = outputData.blocks;
        if (update) {
          this.knowledgeService.operateArticles(outputData, this.id, this.title, this.description).subscribe(
            (response: any) => {
              this.id = response;
              if (this.id == '1') {
                this.openSnackBar("This article no longer exists, you may have deleted it!", '');
                window.location.reload()
              }
              this.route.navigateByUrl('courses/article/' + this.id);
              this.updatingData = false;
              this.openSnackBar("The progress has been saved", '');
            },
            (error) => {
              this.updatingData = false;
              this.openSnackBar("Please give a heading or title to the article, and try again", '');
              this.startedProfanityCheck = false;
            }
          )
        }
        else {
          this.knowledgeService.publishArticles(outputData, this.id, this.title, this.description).subscribe(
            (response: any) => {
              this.updatingData = false;
              this.state = 'review';
              this.openSnackBar("The article has been sent for review!!", '');
            },
            (error) => {
              this.updatingData = false;
              this.openSnackBar("There seems to be a problem, please try again!", '');
            }
          )
        }
      }
      else if (outputData.blocks.length == 0 || this.title == '') {
        this.updatingData = false;
        this.openSnackBar("Please add something title and paragraph to the article to save!", "");
      }
      else if (this.arrayEqual(this.prevData, outputData.blocks)) {
        this.openSnackBar("No change in article detected", '')
        this.updatingData = false;
      }
    }).catch((error) => {
      this.updatingData = false;
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



  // To check if there are any changes made in the new and previous one
  arrayEqual(ary1: any[], ary2: any[]) {
    var new_ary2 = [];
    var new_ary1 = [];
    ary2.forEach(element => {
      new_ary2.push(JSON.stringify(element.data));
    });
    ary1.forEach(element => {
      new_ary1.push(JSON.stringify(element.data));
    });
    return (new_ary1.join('') == new_ary2.join(''));
  }

  startedProfanityCheck = false;



  // To add the article to course, when we publish it to the path
  addToCourse() {
    if (this.param_article != '1') {
      this.updatingData = true;
      this.editor.save().then(data => {
        this.startedProfanityCheck = true;

        var stripped_data = this.htmlStrip(data);

        this.knowledgeService.checkProfanity(stripped_data).subscribe(
          (result: any) => {
            if (result.profane) {
              this.dialog.open(ProfanityComponent, {
                data: { data: result }
              })
              this.startedProfanityCheck = false;
              this.updatingData = false;
              this.openSnackBar("This article couldn't pass the profanity check", '');
            }
            else {
              this.publishArticle()
              this.updatingData = false;
              this.startedProfanityCheck = false;
            }
          }, error => {
            this.publishArticle()
            this.updatingData = false;
            this.startedProfanityCheck = false;
          }
        )
      })
    }
    else {
      this.openSnackBar("Please save the article first!", '');
    }
  }



  publishArticle() {
    if (this.param_article != '1') {
      this.updateArticle(true);
      const dialogRef = this.dialog.open(CoursesComponent, {
        data: { article_id: this.id, current_course: this.article.data?.get_category.id }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.updatingData = false;
        if (result?.reload) {
          window.location.reload();

        }
      });
    }
    else {
      this.openSnackBar("Please save the article first!", '');
    }
  }


  // To create tags for the article
  //Some changes have to be made to get it running
  openTagDialog() {
    const dialogRef = this.dialog.open(ArticleTagComponent, {
      minWidth: 280,
      data: { article_id: this.id }
    })
  }


  // to strip the html from the data, which is sent to the microservice for checking for profanity
  htmlStrip(data) {
    var data_to_check = {};
    var changedData = []
    // console.log(data);
    changedData.push({
      "data": { "level": 2, "text": this.title },
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


  checkForAuthor() {
    this.userService.inGroup("Authors").subscribe(
      (response: Boolean) => {
        if (response) {
          this.knowledgeService.wakeUpCall().subscribe(
            result => { }
          )
          return true;
        }
        else {
          this.route.navigate(["welcome"]);
          return false;
        }
      }, error => {
        return false;
      }
    )
  }

  logout() {
    this.authService.logoutUser();
  }

}
