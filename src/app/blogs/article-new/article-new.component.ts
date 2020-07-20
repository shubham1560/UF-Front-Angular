import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private url: UrlconfigService,
    private loggerService: LoggerService,
    private fb: FormBuilder,
  ) { }

  elements= [];
  article = "";
  addTitle: FormGroup;
  addParagraph: FormGroup;

  ngOnInit() {

    this.addTitle = this.fb.group({
      title: ['', [Validators.required]],
    });

    this.addParagraph = this.fb.group({
      paragraph: [''],
    });

    this.elements.push(this.article);
    this.loggerService.logData('uf-article-new', this);
  }

  addTitleElement(){
    var heading = "<h2>"+this.addTitle.get('title').value+"</h2>";
    this.elements[0] = (heading);
    this.article = this.arrayToString(this.elements, "");
    // var c = this.elements.toString()
    // console.log(c);

  }

  addParagraphElement(){
    var paragraph = "<p>"+this.addParagraph.get('paragraph').value+"</p>";
    this.elements.push(paragraph);
    this.article = this.arrayToString(this.elements, "");
  }

  onImageChange(event){
    if (event.target.files[0]) {
      const uploadImage = new FormData();
      uploadImage.append('image', event.target.files[0], event.target.files[0].name);
      // uploadImage.append('token', this.authService.getToken());
      const url = `${this.url.base_url}attachment/add_image/`
      this.http.post(url, uploadImage).subscribe(
        (result:any) => {
          console.log(result);
          var image = " <br><br> <img src='"+result.image_url+"' height=200px widht=300px>";
          this.elements.push(image);
          this.article = this.arrayToString(this.elements, "");
        },
        error => { 
          console.log("well");
          console.log(error) 
        }
      )
    }
    else{
      console.log("hawabaazi");
      
    }
    
  }

  arrayToString(arr:any, art: string){
    arr.forEach(function(element, index){
      art+=element;
    })
    return art;
  }

  makeBold(){

  }

  makeItalic(){

  }

  makeHyperlink(){

  }

  makeTitle(){

  }

  makeHighlight(){

  }

  makeNewSection(){
    
  }

}
