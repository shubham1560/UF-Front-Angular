import { Component, OnInit } from '@angular/core';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import EditorJS from '@editorjs/editorjs';
import header from '@editorjs/header';
import rawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
import checkList from '@editorjs/checklist';
import List from '@editorjs/list';
import embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Link from '@editorjs/link';
import Warning from '@editorjs/warning';
import delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';


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
  ) { }

  editor: EditorJS
  data: any;
  a;
  ngOnInit() {

    // this.a = '{"type":"header","data":{"text":"Testing the hell out of it","level":2}},{"type":"image","data":{"file":{"url":"https://urbanfraud-test.s3.amazonaws.com/articleimages/compressed/bg_ZrcEzzJ.JPG","stretched":false,"withBackground":false,"withBorder":false},"caption":"","withBorder":false,"stretched":false,"withBackground":false}},{"type":"paragraph","data":{"text":"Well hello sir"}}'
    // this.replacement(this.a);

    this.userService.inGroup("Authors").subscribe(
      (response:Boolean) => {
        console.log(response);
        if (response){
          return true;
        }
        else{
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
          this.initializeEditor();
        }
        else {
          this.knowledgeService.getArticleById(article_id).subscribe(
            (response: any) => {
              this.id = article_id;
              var len = response.data.article_body.length - 1;
              this.data = {
                time: 1552744582955, 
                blocks:  this.replacement(response.data.article_body.substring(1, len)),  //changing the data of string into array of objects
                version: "2.11.10"
              };
              this.initializeEditor();
              // console.log(this);
              
            }, error => {
              console.log(error);
            }
          )
        }
      }
    )
  }

  id = '';  // if id =0, first save, otherwise populating the id from response

  initializeEditor(){
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
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
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

  updateArticle(update) {
    this.editor.save().then((outputData) => {
      this.updatingData = true;
      if (outputData.blocks.length > 0) {
        if (update) {
          this.knowledgeService.operateArticles(outputData, this.id).subscribe(
            (response: any) => {
              this.id = response
              this.route.navigateByUrl('courses/article/'+this.id);
              this.updatingData = false;
              // console.log(response);
            }
          )
        }
        else {
          this.knowledgeService.publishArticles(outputData, this.id).subscribe(
            (response: any) => {
              this.updatingData = false;
              // console.log(response);
            }
          )
        }
      }
      else {
        console.log("likh toh le bhai pehle");
      }
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  replacement = function(a) {
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
          c.push(JSON.parse(a.substring(j, i)))  ;
          j = i+1
        } 
      } 
    }
    c.push(JSON.parse(a.substring(j, a.length)))  ;
    return c;
  }
}
