import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAttachmentComponent } from '../delete-attachment/delete-attachment.component'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feature-request',
  templateUrl: './feature-request.component.html',
  styleUrls: ['./feature-request.component.scss']
})
export class FeatureRequestComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private url: UrlconfigService,
    private log: LoggerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  supportForm: FormGroup;
  uploadingImage = false;
  buttonText = "Upload images/screenshots"

  ngOnInit(): void {
    this.supportForm = this.fb.group({
      short_description: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

    this.log.logData("st-feature", this);
  }

  attachments = [
    {
      "success": 1,
      "file": {
        "url": "https://sortedtree-test.s3.amazonaws.com/articleimages/compressed/download_p2cspYW.jpeg",
        "real_url": "https://sortedtree-test.s3.amazonaws.com/articleimages/real_image/download_IR91Hjq.jpeg",
        "name": "download.jpeg",
        "id": 107,
        "sys_created_on": "2020-10-29T20:33:16.135554Z"
      }
    },
    {
      "success": 1,
      "file": {
        "url": "https://sortedtree-test.s3.amazonaws.com/articleimages/compressed/download_1_zCTFaP2.jpeg",
        "real_url": "https://sortedtree-test.s3.amazonaws.com/articleimages/real_image/download_1_SGiUcAH.jpeg",
        "name": "download (1).jpeg",
        "id": 108,
        "sys_created_on": "2020-10-29T20:33:24.685888Z"
      }
    },
    {
      "success": 1,
      "file": {
        "url": "https://sortedtree-test.s3.amazonaws.com/articleimages/compressed/download_1_REl5Fpu.jpeg",
        "real_url": "https://sortedtree-test.s3.amazonaws.com/articleimages/real_image/download_1_2i8K75m.jpeg",
        "name": "download (1).jpeg",
        "id": 109,
        "sys_created_on": "2020-10-29T20:33:40.219415Z"
      }
    }
  ];

  requestFeature() {
    console.log(this.supportForm);
    // console.log("calling");

  }


  onImageChange(event) {
    if (this.authService.isLoggedIn()) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.uploadingImage = true;
        this.buttonText = "Uploading..."
        if (event.target.files[i]) {
          const uploadImage = new FormData();
          uploadImage.append('image', event.target.files[i], event.target.files[i].name);
          uploadImage.append('token', this.authService.getToken());
          uploadImage.append('table', 'Feature');
          const url = `${this.url.base_url}attachment/general_add_image/`;
          this.http.post(url, uploadImage).subscribe(
            (result: any) => {
              // console.log(result);
              this.supportForm.get('attachments');
              this.attachments.push(result);
              this.uploadingImage = false;
              this.buttonText = "Upload images/screenshots"
            },
            error => {
              this._snackBar.open(error.error, '', {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top",
              });
              this.uploadingImage = false;
              this.buttonText = "Upload images/screenshots"
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

  checkValidForm() {
    if (!this.supportForm.valid) {
      var message = "Please enter short description and description first!";
      this._snackBar.open(message, '', {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
  }
}
