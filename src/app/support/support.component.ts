import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { LoginpromptComponent } from '../auth/loginprompt/loginprompt.component';
import { AuthService } from '../services/authservice/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Support - SortedTree");
  }

  // openLogin(){}
  navigate(page){
    if(this.authService.isLoggedIn()){
      this.route.navigate(['support', page]);
    }
    else{
      this.openLoginPrompt();
    }
  }

  openLoginPrompt() {
    const dialogRef = this.dialog.open(LoginpromptComponent);
  }
}
