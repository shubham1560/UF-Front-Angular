import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CxMenuService {

  loggerEnable: boolean = true;

  constructor() { }


  // Press altKey+ left_mouse_click to get the data of the component, give the id to all the components
  logData(id: string, data: {}) {
    if (this.loggerEnable) {
      var a = document.getElementById(id);
      a["data"] = data;
      a.addEventListener("click", function (event) {
        if (event.altKey){
          console.log(a["data"]);
        }
      })
    }
  }
}
