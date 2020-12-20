import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';

@Component({
  selector: 'app-assign-path',
  templateUrl: './assign-path.component.html',
  styleUrls: ['./assign-path.component.scss']
})
export class AssignPathComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<AssignPathComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public knowledge: DataService,
  ) { }

  users = [];
  ngOnInit(): void {
    // console.log(this.path);
    this.auth.get_moderators().subscribe(
      (result:any) => {
        this.users = result;
      }
    )
    
  }

  assignModerator(user){
    this.knowledge.changeModerator(user, this.data.path).subscribe(
      (result:any) => {
        this.dialogRef.close();
      },
      error=>{
        alert('some error on server')
      }
    )
    
  }

}
