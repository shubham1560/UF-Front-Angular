import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import EditorJS from '@editorjs/editorjs';
import header from '@editorjs/header'; 
import rawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
import checkList from '@editorjs/checklist';
import List from '@editorjs/list';
import embed from'@editorjs/embed';
import Quote from '@editorjs/quote';
import Link from '@editorjs/link';
import delimiter from '@editorjs/delimiter';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private url: UrlconfigService,
    private loggerService: LoggerService,
    private fb: FormBuilder,
    private knowledgeService: DataService,
  ) { }

  elements = [];
  article = "";
  addTitle: FormGroup;
  addParagraph: FormGroup;
  element: number;
  editor: EditorJS

  ngOnInit() {

    this.editor = new EditorJS({
      holder: 'editorjs',

      placeholder: 'Let`s do some good together, Start writing by clicking here!',

      tools: {
        // embed: embed,
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

    

    // this.addTitle = this.fb.group({
    //   title: ['', [Validators.required]],
    // });

    // this.addParagraph = this.fb.group({
    //   paragraph: [''],
    // });

    // this.elements.push(this.article);
    // this.loggerService.logData('uf-article-new', this);
  }

  id = '';  // if id =0, first save, otherwise populating the id from response

  saveData(){
    this.editor.save().then((outputData) => {
    this.knowledgeService.operateArticles(outputData, this.id).subscribe(
      (response:any) => {
        this.id = response
        console.log(response);
        
      }
    )

      console.log('Article data: ', outputData)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  // addTitleElement() {
  //   var heading = "<h2>" + this.addTitle.get('title').value + "</h2>";
  //   this.elements[0] = (heading);
  //   this.article = this.arrayToString(this.elements, "");
  // }

  // addParagraphElement() {
  //   var paragraph = "<p>" + this.addParagraph.get('paragraph').value + "</p>";
  //   this.elements.push(paragraph);
  //   this.article = this.arrayToString(this.elements, "");
  // }

  // onImageChange(event) {
  //   if (event.target.files[0]) {
  //     const uploadImage = new FormData();
  //     uploadImage.append('image', event.target.files[0], event.target.files[0].name);
  //     const url = `${this.url.base_url}attachment/add_image/`
  //     this.http.post(url, uploadImage).subscribe(
  //       (result: any) => {
  //         // console.log(result);
  //         var image = " <br><br> <img src='" + result.image_url + "' height='300px' width=auto>";
  //         this.elements.push(image);
  //         this.article = this.arrayToString(this.elements, "");
  //       },
  //       error => {
  //         // console.log("well");
  //         // console.log(error)
  //       }
  //     )
  //   }
  //   else {
  //     // console.log("hawabaazi");

  //   }

  // }

  // arrayToString(arr: any, art: string) {
  //   arr.forEach(function (element, index) {
  //     art += element;
  //   })
  //   return art;
  // }

  // makeBold() {
  //   this.changeSelected("<b>", "</b>");
  //   // var a: any = window.getSelection();
  //   // var data = a.baseNode.data;
  //   // var repeatData = "<i>" + data + "</i>"
  //   // var ind;
  //   // var indl;
  //   // this.elements.forEach(function (element1: string, index: number) {
  //   //   if (element1.includes(data)) {
  //   //     ind = index;
  //   //     return;
  //   //   }
  //   // })

  //   // this.elements.forEach(function (element1, index) {
  //   //   if (element1.includes(repeatData)) {
  //   //     ind = index;
  //   //     return;
  //   //   }
  //   // })

  //   // // if (indl) {
  //   //   // console.log(this.elements[indl]);
  //   // // }
  //   // var end = a.focusOffset;
  //   // var start = a.baseOffset;
  //   // var text = data.substring(start, end);
  //   // // var textAlready = data.substring((start - 3), (end + 3));
  //   // console.log(data);
  //   // console.log(start, end, text);
  //   // // console.log(textAlready);
  //   // if (!this.elements[ind].includes("<i>"+text+"</i>")) {
  //   //   console.log("running")
  //   //   this.elements[ind] = this.elements[ind].replace(text, "<i>" + text + "</i>");
  //   // }
  //   // else if(this.elements[ind].includes("<i>"+text+"</i>")) {
  //   //   console.log("too")
  //   //   this.elements[ind] = this.elements[ind].replace("<i>" + text + "</i>", text)
  //   // }
  //   // this.article = this.arrayToString(this.elements, "");
  // }

  // getTheWholeFuckingDom() {
  //   var a = document.getElementById("article");
  //   // console.log(a);
  // }

  // makeItalic() {
  //   this.changeSelected("<i>", "</i>");
  // }

  // makeHyperlink() {

  //   this.changeSelected("<a href='www.google.com'>", "</a>");
  // }

  // makeTitle() {
  //   this.changeSelected("<h1>", "</h1>")
  // }

  // makeHighlight() {

  // }

  // makeNewSection() {

  // }


  // changeSelected(starttag, b){
  //   var a: any = window.getSelection();
  //   var data = a.baseNode.data;
  //   var repeatData = starttag + data + b
  //   var ind;
  //   var indl;
  //   this.elements.forEach(function (element1: string, index: number) {
  //     if (element1.includes(data)) {
  //       ind = index;
  //       return;
  //     }
  //   })

  //   this.elements.forEach(function (element1, index) {
  //     if (element1.includes(repeatData)) {
  //       ind = index;
  //       return;
  //     }
  //   })

  //   // if (indl) {
  //     // console.log(this.elements[indl]);
  //   // }
  //   var end = a.focusOffset;
  //   var start = a.baseOffset;
  //   var text = data.substring(start, end);
  //   // var textAlready = data.substring((start - 3), (end + 3));
  //   // console.log(data);
  //   // console.log(start, end, text);
  //   // console.log(textAlready);
  //   if (!this.elements[ind].includes(starttag+text+b)) {
  //     // console.log("running")
  //     this.elements[ind] = this.elements[ind].replace(text, starttag + text + b);
  //   }
  //   else if(this.elements[ind].includes(starttag+text+b)) {
  //     // console.log("too")
  //     this.elements[ind] = this.elements[ind].replace(starttag + text + b, text)
  //   }
  //   this.article = this.arrayToString(this.elements, "");
  // }
  

}
