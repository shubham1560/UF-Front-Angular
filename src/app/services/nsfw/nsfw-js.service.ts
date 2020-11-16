import { Injectable, OnInit } from '@angular/core';
import * as nsfwjs from 'nsfwjs'


@Injectable({
  providedIn: 'root'
})
export class NsfwJsService implements OnInit{

  img ='<img _ngcontent-phi-c344="" loading="lazy" alt="Nature" class="responsive caption ng-star-inserted" src="https://sortedtree-test.s3.amazonaws.com/attachments/KbKnowledge/compress/download_1.jpeg">';

  // nsfwjs.load().then(function (model) {
  //   model.classify(this.img).then(function (predictions) {
  //     console.log('Predictions: ', predictions)
  //   })
  // })
  constructor() { }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.loadModel()
  }

  loadModel(){
  }
}
