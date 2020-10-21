import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pathbuilder',
  templateUrl: './pathbuilder.component.html',
  styleUrls: ['./pathbuilder.component.scss']
})
export class PathbuilderComponent implements OnInit {

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(this.movies);
    
  }

  constructor(
    private userService: UserprofileService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userService.inGroup("Moderators").subscribe(
        (response: Boolean) => {
          console.log(response);

          if (response) {
            return true;
          }
          else {
            window.location.href = "welcome";
            return false;
          }
        }, error => {
          return false;
        }
      )
    }
    else{
        window.location.href = "welcome";
    }
  }

}
