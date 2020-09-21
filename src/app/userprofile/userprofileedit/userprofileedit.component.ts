import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';


@Component({
  selector: 'app-userprofileedit',
  templateUrl: './userprofileedit.component.html',
  styleUrls: ['./userprofileedit.component.scss']
})
export class UserprofileeditComponent implements OnInit {

  userProfileEditForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserprofileeditComponent>,
    @Inject(MAT_DIALOG_DATA) public user_data: any,
    private userService: UserprofileService,
  ) { }

  isEditing = false;
  jobDone = false;

  ngOnInit(): void {
    console.log(this.user_data);
    this.userProfileEditForm = this.fb.group({
      first_name: [this.user_data.user.first_name|| "", Validators.required],
      last_name: this.user_data.user.last_name|| "",
      about: this.user_data.user.about || " ",
    })
    // console.log(this.user_data.user.first_name);
  }

  editUserDetail() {
    this.isEditing = true;
    this.userService.editUserData(this.userProfileEditForm.value).subscribe(
      data=>{
        // console.log(data);
        this.isEditing = false;
        this.jobDone = true;
      },
      error=>{
        // console.log(error);
      }
    )
  }

}
