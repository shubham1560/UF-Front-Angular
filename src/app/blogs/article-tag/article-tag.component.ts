import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';

@Component({
  selector: 'app-article-tag',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.scss']
})
export class ArticleTagComponent implements OnInit {

  constructor(
    private knowledge: DataService
  ) { }

  article_id = "hello-6cceef16";
  articleTags;
  fetchedTags;
  ngOnInit(): void {
    // request to fetch all the tags from tag table
    // getting all tags
    this.fetchAllTags();
    this.fetchRelatedTags(this.article_id);
    // request to get all the tags of the article if have any
    // getting all the tags already wth article
  }
  selectedTag;
  addToTags(event, inputTag) {
    // console.log(inputTag);
    if (event.keyCode == 13) {
      this.findTag(inputTag);
    }
  }

  fetchAllTags(){
    // fetch all the tags from tag table
    this.knowledge.getAllTags().subscribe(
      result=>{
        this.fetchedTags = result;
      }, error =>{
        this.fetchedTags = [];
      }
    )
    // this.fetchedTags = [{ "label": "Angular", "id": 1 }, { "label": "django", "id": 2 }, { "label": "digitalocean", "id": 3 }];
  }
  
  fetchRelatedTags(article_id){
    this.articleTags = []
    this.knowledge.getArticleTags(this.article_id).subscribe(
      (result:any)=>{
        console.log(result);
        result.forEach(element => {
          this.articleTags.push(element.get_tag);   
        });
      }
    )
    // conso

  }

  

  findTag(tag) {
    var found = false;
    this.fetchedTags.forEach(element => {
      if (element.label.toUpperCase() == tag.toUpperCase()) {
        if (!this.alreadyInTagsNotPush(element)) {
          this.articleTags.push(element);
        }
        found = true;
      }
    });
    if (!found) {
      // console.log("not found, make a new one!");
      this.knowledge.postTag(tag).subscribe(
        result=>{
          console.log(result);
          this.createAndAdd(result);
        }
      )
      
    }
  }

  createAndAdd(tag){
    // console.log("create and add the tag to tags");
    this.articleTags.push(tag);
    this.fetchedTags.push(tag);
    

    //request to create a tag in tag table and also add it to article
    //create tag
    //create articletag with article and tag
    this.knowledge.postArticleTag(this.article_id, tag.id).subscribe(
      result=>{
        console.log(result);
      }
    )
    // make artilce

  }

  alreadyInTagsNotPush(selectedTag) {
    var already_in = false;
    this.articleTags.forEach(element => {
      if (element.label.toUpperCase() == selectedTag.label.toUpperCase()) {
        already_in = true
      }
    });
    return already_in;
  }

  deleteFromTags(id){
    this.articleTags.forEach((element, index) => {
      if (element.id == id) {
        this.articleTags.splice(index, 1);
        
        // request to delete the record from table for corresponding tag and article id
        //delete articletag with tag and article
      }
    });
  }
}
