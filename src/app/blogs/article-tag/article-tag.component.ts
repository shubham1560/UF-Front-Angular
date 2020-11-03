import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-tag',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.scss']
})
export class ArticleTagComponent implements OnInit {

  constructor(
    private knowledge: DataService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ArticleTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  article_id = "hello-6cceef16";
  articleTags;
  fetchedTags;
  loadingAllTags = true;
  fetchingRelatedTags = true;

  ngOnInit(): void {
    this.article_id = this.data.article_id;
    this.fetchAllTags();
    this.fetchRelatedTags(this.article_id);

    // request to fetch all the tags from tag table
    // getting all tags

    // request to get all the tags of the article if have any
    // getting all the tags already wth article
  }
  selectedTag;
  addToTags(event, inputTag) {
    // console.log(inputTag);
    if (event.keyCode == 13) {
      if (inputTag != '') {
        this.findTag(inputTag);
      }
      this.selectedTag = '';
    }
  }

  fetchAllTags() {
    // fetch all the tags from tag table
    this.knowledge.getAllTags().subscribe(
      result => {
        this.fetchedTags = result;
        this.loadingAllTags = false;
      }, error => {
        this.loadingAllTags = false;
        this.fetchedTags = [];
        this.openSnackBar("Error occured while fetching the tags");
      }
    )
    // this.fetchedTags = [{ "label": "Angular", "id": 1 }, { "label": "django", "id": 2 }, { "label": "digitalocean", "id": 3 }];
  }

  fetchRelatedTags(article_id) {
    this.articleTags = []
    this.knowledge.getArticleTags(this.article_id).subscribe(
      (result: any) => {
        // console.log(result);
        result.forEach(element => {
          this.articleTags.push(element.get_tag);
        });
        this.fetchingRelatedTags = false;
      }, error => {
        this.fetchingRelatedTags = false;
        this.openSnackBar("Error occured while fetching the article tags");
      }
    )
    // conso

  }

  findTag(tag) {
    var found = false;
    this.fetchedTags.forEach(element => {
      if (element.label.toUpperCase() == tag.toUpperCase()) {
        if (!this.alreadyInTagsNotPush(element)) {
          this.addArticleTag(element.id)
          this.articleTags.push(element);
        }
        found = true;
      }
    });
    if (!found) {
      // console.log("not found, make a new one!");
      this.knowledge.postTag(tag).subscribe(
        result => {
          // console.log(result);
          this.createAndAdd(result);
        }
      )
    }

  }

  createAndAdd(tag) {
    // console.log("create and add the tag to tags");
    this.articleTags.push(tag);
    this.fetchedTags.push(tag);


    //request to create a tag in tag table and also add it to article
    //create tag
    //create articletag with article and tag
    this.addArticleTag(tag.id)
    // this.knowledge.postArticleTag(this.article_id, tag.id).subscribe(
    //   result=>{
    //     console.log(result);
    //   }
    // )
    // make artilce

  }

  addArticleTag(tag_id) {
    this.knowledge.postArticleTag(this.article_id, tag_id).subscribe(
      result => {
        // console.log(result);
      }
    )
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

  deleteArticleTag(tag_id) {
    this.knowledge.delArticleTag(this.article_id, tag_id).subscribe(
      result => {
        this.openSnackBar("tag deleted successfully!");
      }, error =>{
        this.openSnackBar("tag deleted unsuccessfully!");
      }
    )
  }


  deleteFromTags(id) {
    // console.log(id);
    this.articleTags.forEach((element, index) => {
      if (element.id == id) {
        this.articleTags.splice(index, 1);
        // request to delete the record from table for corresponding tag and article id
        //delete articletag with tag and article
        this.deleteArticleTag(id);
      }
    });
  }

  changeRelevance(relevance, tag_id) {
    // console.log(relevance)
    // console.log(tag_id);
    this.knowledge.editArticleTag(this.article_id, tag_id, relevance).subscribe(
      result => {
        // console.log(result);
        this.openSnackBar("Relevance updated!")
      }, error => {
        // console.log(error);
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
