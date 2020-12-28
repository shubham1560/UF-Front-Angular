import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.scss']
})
export class AddToGroupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddToGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private loggerService: LoggerService
  ) { }

  allGroups = [];
  groupAlreadyIn
  ngOnInit(): void {
    this.authService.getGroups().subscribe(
      (result:any)=>{
        this.allGroups = result;
        this.allGroups = this.extractGroupArray(result);
        this.groupAlreadyIn =  this.extractGroupArray(this.data.user.groups) //this.data.user.groups
        this.groupNotInA();
      },
      error=>{
      }
    )
    this.loggerService.logData("manage-group", this);
  }

  groupNotIn = []

  addGroupsToUser(){
    this.authService.addGroupUser(this.data.user, this.groupAlreadyIn).subscribe(
      result=>{
        this.dialogRef.close({reload:true})
      }
    )
  }

  extractGroupArray(object){
    var a = []
    object.forEach(element => {
      a.push(element.name);
    });
    return a;
  }

  groupNotInA(){
    this.allGroups.forEach(element=>{
      if(this.groupAlreadyIn.indexOf(element) == "-1"){
        this.groupNotIn.push(element);
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
