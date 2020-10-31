import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { DeleteAttachmentComponent } from '../delete-attachment/delete-attachment.component';
import { EditNameComponent } from '../edit-name/edit-name.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SupportService } from 'src/app/services/support/support.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {

  constructor(
    private support: SupportService,
    private authService: AuthService,
    private http: HttpClient,
    private url:  UrlconfigService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private log: LoggerService
  ) { }

  ticket_id;
  ticket_type;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.ticket_type = params.get('type');
        this.ticket_id = params.get('id');
        this.support.getAttachments(this.ticket_type, this.ticket_id).subscribe(
          (response:any)=>{
            // console.log(response);
            this.attachments = response
            console.log(this.attachments)
          }, error =>{
            console.log(error);
          }
        )

      }
    )
    this.log.logData('st-attachments', this);
  }

  attachments = [];


  onImageChange(event) {
    if (this.authService.isLoggedIn()) {
      for (var i = 0; i < event.target.files.length; i++) {
        // this.uploadingImage = true;
        // this.buttonText = "Uploading..."
        if (event.target.files[i]) {
          const uploadImage = new FormData();
          uploadImage.append('image', event.target.files[i], event.target.files[i].name);
          uploadImage.append('token', this.authService.getToken());
          uploadImage.append('table', 'Feature');
          const url = `${this.url.base_url}attachment/general_add_image/`;
          this.http.post(url, uploadImage).subscribe(
            (result: any) => {
              // this.supportForm.get('attachments');
              this.attachments.push(result);
              // this.uploadingImage = false;
              // this.buttonText = "Upload images/screenshots"
            },
            error => {
              this._snackBar.open(error.error, '', {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top",
              });
              // this.uploadingImage = false;
              // this.buttonText = "Upload images/screenshots"
            }
          )
        }
        else {
        }

      }
    }
  }

  deleteAttachment(id) {
    var idx_to_delete;
    this.attachments.forEach(function (value, i) {
      if (value.file.id == id) {
        idx_to_delete = i
      }
    });
    const dialogRef = this.dialog.open(DeleteAttachmentComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attachments.splice(idx_to_delete, 1);
      }
    });
  }

  editAttachment(id, name) {
    const dialogRef = this.dialog.open(EditNameComponent, {
      data: { id: id, name: name },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result?.edit) {
        this.attachments.forEach(element => {
          if (element.file.id == id) {
            element.file.name = result.new_name;
          }
        });
      }
    });
  }
}
