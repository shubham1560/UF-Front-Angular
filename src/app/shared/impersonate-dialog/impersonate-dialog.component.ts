import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
  selector: 'app-impersonate-dialog',
  templateUrl: './impersonate-dialog.component.html',
  styleUrls: ['./impersonate-dialog.component.scss']
})
export class ImpersonateDialogComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  users;

  ngOnInit(): void {
    this.auth.getUsers().subscribe(
      result=>{
        this.users = result;
      }
    )
  }


  startImpersonation(username){
    this.auth.getImpersonationToken(username).subscribe(
      (result:any)=>{
        localStorage.setItem("t_token", localStorage.getItem("token"));
        localStorage.setItem("token", result)
        // localStorage.se
        window.location.reload();
        // console.log(result);
      }
    )
  }
}
