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
import delimiter from '@editorjs/delimiter';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  constructor(
    private url: UrlconfigService,
    private knowledgeService: DataService,
  ) { }

  editor: EditorJS

  ngOnInit() {

    this.editor = new EditorJS({

      holder: 'editorjs',

      data: {
        time: 1552744582955,
        blocks: [
          {
            type: "image",
            data: {
              caption: "",
              file:
              {
                url: "https://urbanfraud-test.s3.amazonaws.com/articleimages/compressed/bg_ZrcEzzJ.JPG",
                stretched: false,
                withBackground: false,
                withBorder: false,
              }
            }
          }
        ],
        version: "2.11.10"
      },

      placeholder: 'Let`s do some good together, Start writing by clicking here!',
      
      readOnly: false,

      tools: {
        header: {
          class: header,
          inlineToolbar: ['link']
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        delimiter: {
          class: delimiter
        },
        embed: {
          class: embed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: {
                regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
                embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
                html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                height: 300,
                width: 600,
                id: (groups) => groups.join('/embed/')
              }
            }
          }
        },
        linkTool: {
          class: Link,
          // config: {
          // endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
          // }
        },
        checklist: {
          class: checkList,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `${this.url.base_url}attachment/add_image/`, // Your backend file uploader endpoint
            }
          }
        },
        raw: rawTool,

      }

    })

  }

  id = '';  // if id =0, first save, otherwise populating the id from response

  updateArticle(update) {
    this.editor.save().then((outputData) => {

      if (outputData.blocks.length > 0) {
        if (update) {
          this.knowledgeService.operateArticles(outputData, this.id).subscribe(
            (response: any) => {
              this.id = response
              console.log(response);
            }
          )
        }
        else {
          this.knowledgeService.publishArticles(outputData, this.id).subscribe(
            (response: any) => {
              console.log(response);
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

}
