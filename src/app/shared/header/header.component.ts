import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchResultsComponent } from '../search-results/search-results.component'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { ImpersonateDialogComponent } from '../impersonate-dialog/impersonate-dialog.component';
import { UsingTheEditorComponent } from 'src/app/blogs/using-the-editor/using-the-editor.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  user: any = {};
  error: any;
  image = false;
  searchQueryForm: FormGroup;
  roots;
  isAuthor;
  userDetailFetched = false;

  constructor(
    private authService: AuthService,
    private loggerService: LoggerService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private knowledgeService: DataService,
    private userService: UserprofileService,
  ) { }

  display_name;
  full_name;
  superUser;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      // console.log("calling func");
      this.authService.getLoggedInUserDetail().subscribe(
        (response: any) => {
          this.superUser = response.gtg;
          this.user = response.user;
          this.userDetailFetched =true;
          this.display_name = this.user.first_name[0];
          this.full_name = this.user.first_name;
          if (this.user.last_name){
            this.display_name += this.user.last_name[0]
            this.full_name += " "+this.user.last_name;
          }
          if (this.user.profile_pic) {
            this.image = this.user.profile_pic;
          }
          if (this.user.profile) {
            this.image = this.user.profile;
          }
        },
        error => {
          this.userDetailFetched = true;
          this.error = error;
        }
      )

      this.userService.inGroup('Authors').subscribe(
        response => {
          this.isAuthor = response;
          // console.log(response);
        }
      )
    }


    this.searchQueryForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(1)]],
      // confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    })

    this.ifImpersonated();

    this.loggerService.logData("st-header", this);
  }


  loading_root=false;
  getKnowledgeBases() {
    // console.log("getting knowledge bases");
    this.loading_root = true;
    this.knowledgeService.getKnowledgeBases().subscribe(
      (result: any) => {
        this.roots = result.bases;
        this.loading_root =false;
      },
      error => {
        this.loading_root = false;
        // console.log(error);
      }

    )
  }



  searchResults() {
    var queryParm = this.searchQueryForm.get('query');

    if (queryParm.valid) {
      const dialogRef = this.dialog.open(SearchResultsComponent, {
        data: {
          query: queryParm.value
        }
      });
      dialogRef.afterClosed().subscribe(result=>{
        this.searchQueryForm.setValue({"query":''})
      })
    }


  }

  logout() {
    this.authService.logoutUser();
  }

  sendToLoginPage() {
    localStorage.setItem("redirect_url", window.location.href);
  }


  openImpersonation(){
    const dialogRef = this.dialog.open(ImpersonateDialogComponent, {
      // data: {
        // query: queryParm.value
      // }
    });
  }

  impersonated;

  ifImpersonated(){
    if(localStorage.getItem("t_token")){
      if(localStorage.getItem("t_token") != localStorage.getItem("token")){
        this.impersonated = true;
      }
    }
  }

  endImpersonation(){
    localStorage.setItem("token", localStorage.getItem("t_token"));
    localStorage.removeItem("t_token");
    window.location.reload()
  }

  becomeAuthor(){
    const dialogRef = this.dialog.open(UsingTheEditorComponent, {
      data: {"dialog": true}
    })
  }

}
