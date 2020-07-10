import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  loggerEnable: boolean = true;

  constructor() { }


  // Press altKey+ left_mouse_click to get the data of the component, give the id to all the components
  logData(id: string, data: {}) {
      if (this.loggerEnable) {
        console.log(id);
        var a = document.getElementById(id);
        console.log(a);
        a["this"] = data;
        a.addEventListener("click", function (event) {
          if (event.altKey){
            console.log("called")
            console.log(a["this"]);
            // console.log(a);
          }
          if (event.shiftKey){
            console.log({"data":a["this"]["data"]});
          }
        })
      }
    
  }
}
