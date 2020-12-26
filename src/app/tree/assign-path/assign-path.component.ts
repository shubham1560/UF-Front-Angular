import { Component, OnInit, Inject,Input } from '@angular/core';
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

  input = '';
  users = [];
  filtered_users = [];
  ngOnInit(): void {
    this.auth.get_moderators().subscribe(
      (result:any) => {
        this.users = result;
        this.filtered_users = this.users;
        // console.log(this.users);
      }
    )
  }

  filterData(event){
    this.filtered_users = [];
    var searchText = event.toLowerCase();
    this.users.forEach(element => {
      if(element.email.toLowerCase().includes(searchText) || element.last_name.toLowerCase().includes(searchText) || element.first_name.toLowerCase().includes(searchText)){
        this.filtered_users.push(element);
      }
    });
  }


  assignModerator(user){
    this.knowledge.changeModerator(user, this.data.path).subscribe(
      (result:any) => {
        this.dialogRef.close({reload: true});
      },
      error=>{
        alert('some error on server')
      }
    )
    
  }

}
