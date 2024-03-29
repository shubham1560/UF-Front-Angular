import { Component, OnInit, Inject } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { MatDialog } from '@angular/material';
import { DeleteusermodalComponent } from 'src/app/userprofile/deleteusermodal/deleteusermodal.component';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { UserprofileeditComponent } from 'src/app/userprofile/userprofileedit/userprofileedit.component';
import { Title } from '@angular/platform-browser';
import { SharedCardComponent } from 'src/app/shared/shared-card/shared-card.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profile: UserprofileService,
    private loggerService: LoggerService,
    private authService: AuthService,
    private dialog: MatDialog,
    private http: HttpClient,
    private url: UrlconfigService,
    private titleService: Title,
  ) { }

  image: string = "";
  response: any = {};
  error: any = {};
  name: string;
  isLoading: boolean = true;
  email: string;
  about: string;
  imageUploading: boolean = false;
  buttonText = "Upload Image";
  display_name;

  ngOnInit(): void {
    this.profile.getUserData().subscribe(
      result => {
        this.response = result;
        this.isLoading = false;
        this.image = this.response.user.header_image ? this.response.user.header_image : this.response.user.profile_pic;
        this.name = this.response.user.first_name + " " + this.response.user.last_name;
        this.display_name = this.response?.user.first_name[0];
        if (this.response.user.last_name){
          this.display_name += this.response.user?.last_name[0]
        }
        this.email = this.response.user.email;
        this.about = this.response.user.about;
        this.titleService.setTitle(this.name + " - SortedTree");
      },
      error => {
        this.error = error;
      }
    )
    this.loggerService.logData("uf_user_profile", this);

  }

  onImageChange(event) {
    if (event.target.files[0]) {
      this.imageUploading = true;
      this.buttonText = "Uploading...."
      const uploadImage = new FormData();
      uploadImage.append('profile', event.target.files[0], event.target.files[0].name);
      uploadImage.append('token', this.authService.getToken());
      const url = `${this.url.base_url}userprofile/edit_user_image/`
      this.http.post(url, uploadImage).subscribe(
        result => {
          this.imageUploading = false;
          this.ngOnInit();
          this.buttonText = "Upload Image";
        },
        error => { 
          // console.log(error) 
        }
      )
    }
    else{
      // console.log("hawabaazi");
      
    }
  }

  editUser() {
    const dialogRef = this.dialog.open(UserprofileeditComponent, {
      data: this.response,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteUser() {
    this.dialog.open(DeleteusermodalComponent);
  }

  makeAuthor(){
    this.profile.makeUserAuthor().subscribe(
      result=>{
        const dialogRef = this.dialog.open(SharedCardComponent, {
          data: {
            title: "Congratulations!!", 
            sub: "You are now an author, start by writing an article on any existing path!", 
            reload: true,
            primaryButton: 'Close',
            secondaryButton: ''
          },
        });
    
        dialogRef.afterClosed().subscribe(result => {
          // console.log("closed");
          // this.ngOnInit();
          window.location.reload();
        });
        // console.log(result);
      }, error =>{
        // console.log(error);
        
      }

    )
  }
}