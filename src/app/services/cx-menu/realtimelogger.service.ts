import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  loggerEnable: boolean = true;

  constructor() { }

  password = "spyhunter@1560";

  // Press altKey+ right_mouse_click to get the data of the component, give the id to all the components
  logData(id: string, data: {}) {
    // console.log("logger")
    if (this.loggerEnable) {
      var a = document.getElementById(id);
      a["this"] = data;
      a.addEventListener("contextmenu", function (event) {
        if (event.altKey) {
          var passcode = prompt("Give me the password?");
          if (passcode == "spyhunter@1560") {
            console.log(a["this"]);
          }
          else{
            prompt("Wrong password mate!")
          }
        }
        if (event.shiftKey) {
          console.log({ "data": a["this"]["data"] });
        }
      })
    }
  }
  // else{
  //   prompt("Wrong password mate");
  // }
}
