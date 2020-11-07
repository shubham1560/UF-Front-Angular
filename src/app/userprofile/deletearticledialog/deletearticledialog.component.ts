import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-deletearticledialog',
  templateUrl: './deletearticledialog.component.html',
  styleUrls: ['./deletearticledialog.component.scss']
})
export class DeletearticledialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletearticledialogComponent>,
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
