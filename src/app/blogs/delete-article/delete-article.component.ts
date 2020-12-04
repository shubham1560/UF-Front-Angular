import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.scss']
})
export class DeleteArticleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private knowledge: DataService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }

  deleteArticle() {
    this.knowledge.deleteArticle(this.data.article_id).subscribe(
      (response: any) => {
        // console.log(response);
        if (response.deleted) {
          this.openSnackBar("Deleted successfully!", '')
          this.dialogRef.close({ delete: true, article: this.data.article_id });
        }
        else {
          // this.openSnackBar("Deleted successfully!", '')
          this.dialogRef.close({ delete: false, article: this.data.article_id });
        }
      },
      error => {
        // console.log(error);
        this.dialogRef.close({ delete: false, article: this.data.article_id });

      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }


}
