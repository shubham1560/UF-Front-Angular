import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { SupportService } from 'src/app/services/support/support.service'
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAttachmentComponent } from '../delete-attachment/delete-attachment.component'
import { EditNameComponent } from '../edit-name/edit-name.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private url:  UrlconfigService,
    private log: LoggerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private supportService: SupportService,
    private route: Router,
    private titleService: Title,
  ) { }

  supportForm: FormGroup;
  uploadingImage = false;
  buttonText = "Upload images/screenshots"
  formSubmit;

  ngOnInit(): void {
    this.titleService.setTitle("Feature - SortedTree")
    this.supportForm = this.fb.group({
      short_description: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

    this.log.logData("st-feature", this);
  }

  attachments = [];

  finalData;

  requestFeature() {
    this.finalData = {
      "formdata": {
        "short_description": this.supportForm.get('short_description').value,
        "description": this.supportForm.get('description').value
      },
      "attachments": this.attachments
    };
    this.formSubmit = true;
    this.supportService.createSupportRequest(this.finalData, "feature").subscribe(
      result => {
        // console.log(result);
        this.formSubmit = false;
        this._snackBar.open("Fefect has been registered. you can check the status in tickets view!", '', {
          duration: 2000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.route.navigate(["support", "tickets", result, "feature"]);

      }, error => {
        console.log(error);
        this.formSubmit = false;
      }
    )

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
          uploadImage.append('table', 'Enhancement');
          const url = `${this.url.base_url}attachment/general_add_image/`;
          this.http.post(url, uploadImage).subscribe(
            (result: any) => {
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
