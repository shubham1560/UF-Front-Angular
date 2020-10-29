import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
  ) { }

  featureForm: FormGroup;

  ngOnInit(): void {
    this.featureForm = this.fb.group({
      short_description: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

    this.log.logData("st-feature", this);
  }

  attachments = [
    {
      "success": 1,
      "file": {
        "url": "https://sortedtree-test.s3.amazonaws.com/articleimages/compressed/download_1_ceWAHZ1.jpeg",
        "name": "download (1).jpeg",
        "id": 87,
        "sys_created_on": "2020-10-29T11:58:27.263373Z"
      }
    },
    {
      "success": 1,
      "file": {
        "url": "https://sortedtree-test.s3.amazonaws.com/articleimages/compressed/download_gZhspF2.jpeg",
        "name": "download.jpeg",
        "id": 88,
        "sys_created_on": "2020-10-29T11:58:27.262255Z"
      }
    },
    {
      "success": 1,
      "file": {
        "url": "https://sortedtree-test.s3.amazonaws.com/articleimages/compressed/download_PGF6Moj.jpeg",
        "name": "download.jpeg",
        "id": 89,
        "sys_created_on": "2020-10-29T11:59:11.064820Z"
      }
    }
  ];

  requestFeature() {
    console.log(this.featureForm);
    console.log("calling");
    
  }


  onImageChange(event) {
    // console.log(event);
    for (var i = 0; i < event.target.files.length; i++) {
      // console.log(event.target.files[i]);
      if (event.target.files[i]) {
        const uploadImage = new FormData();
        uploadImage.append('image', event.target.files[i], event.target.files[i].name);
        uploadImage.append('token', this.authService.getToken());
        const url = `${this.url.base_url}attachment/general_add_image/`;
        this.http.post(url, uploadImage).subscribe(
          (result: any) => {
            console.log(result);
            this.featureForm.get('attachments');
            this.attachments.push(result);
            console.log(this.attachments);
          },
          error => {
            // console.log(error) 
          }
        )
      }
      else {
        // console.log("hawabaazi");

      }

    }
  }

  deleteAttachment(id){
    console.log(id);
    this.attachments.forEach(element => {
      console.log(element)
    });

    const dialogRef = this.dialog.open(DeleteAttachmentComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }

  editAttachment(id, name){
    this.attachments.forEach(element => {
      if(element.file.id == id){
        element.file.name = name;
      }
    });
    console.log(this.attachments);
  }

}
