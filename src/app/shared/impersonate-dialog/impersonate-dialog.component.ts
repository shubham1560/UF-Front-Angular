import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToGroupComponent } from 'src/app/shared/add-to-group/add-to-group.component'

@Component({
  selector: 'app-impersonate-dialog',
  templateUrl: './impersonate-dialog.component.html',
  styleUrls: ['./impersonate-dialog.component.scss']
})
export class ImpersonateDialogComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
  ) { }

  users;
  input = "";
  filtered_users = [];
  ngOnInit(): void {
    this.auth.getUsers().subscribe(
      result=>{
        this.users = result;
        this.filtered_users = this.users
      }
    )
  }


  startImpersonation(username){
    this.auth.getImpersonationToken(username).subscribe(
      (result:any)=>{
        localStorage.setItem("t_token", localStorage.getItem("token"));
        localStorage.setItem("token", result)
        window.location.reload();
      }
    )
  }

  filterData(event){
    this.filtered_users = [];
    var text = event.toLocaleLowerCase()
    this.users.forEach(element => {
      if(element.email.toLocaleLowerCase().includes(text)|| element.username.toLocaleLowerCase().includes(text) || element.last_name.toLocaleLowerCase().includes(text) || element.first_name.toLocaleLowerCase().includes(text)){
        this.filtered_users.push(element);
      }
    });
    // console.log(this.filtered_users);
  }

  groupManage(user){
    console.log(user);
    const dialogRef = this.dialog.open(AddToGroupComponent, {
      minWidth: "320px",
      // maxWidth: "400px",
      data: {
        user: user
      }
    });
  }

}
