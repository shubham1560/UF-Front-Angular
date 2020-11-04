import { Component, OnInit, Inject } from '@angular/core';
import { CoursesComponent } from 'src/app/blogs/courses/courses.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profanity',
  templateUrl: './profanity.component.html',
  styleUrls: ['./profanity.component.scss']
})
export class ProfanityComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  text_array;

  ngOnInit(): void {  
    this.text_array = this.data.data.result;
    // console.log(this.data.data.result);
  }

}
