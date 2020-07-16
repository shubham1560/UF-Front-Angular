import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
  selector: 'app-deleteusermodal',
  templateUrl: './deleteusermodal.component.html',
  styleUrls: ['./deleteusermodal.component.scss']
})
export class DeleteusermodalComponent implements OnInit {

  constructor(
    private profile: UserprofileService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }


  deleteUser() {
    this.profile.deleteUser().subscribe(
      response => {
        this.authService.logoutUser();
      },
      error => {

      }
    )
  }

}
