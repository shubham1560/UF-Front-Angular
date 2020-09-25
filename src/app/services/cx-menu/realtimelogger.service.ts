import { Injectable } from '@angular/core';
import { UrlconfigService } from '../urlconfig.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  loggerEnable: boolean = true;

  constructor(
    private urlService: UrlconfigService,
  ) { }

  this_local = this;
  // Press altKey+ right_mouse_click to get the data of the component, give the id to all the components
  logData(id: string, data: {}, local_this= this.this_local) {
    // console.log("logger")
        if (this.loggerEnable) {
      var a = document.getElementById(id);
      a["this"] = data;
      a.addEventListener("contextmenu", function (event) {
        if (event.altKey) {
          var username = prompt("The developer username?");
          var passcode = prompt("Give me the password, matey?");
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open("POST", local_this.urlService.base_url+"userprofile/developer/", false);
          xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xmlHttp.send(JSON.stringify({"passcode": passcode, "username": username}));
          if(xmlHttp.responseText == 'true'){
            console.log(a["this"]);
          }
          else {
            alert("Wrong password mate!");
          }
        }
        if (event.shiftKey) {
          // console.log({ "data": a["this"]["data"] });
        }
      })
    }
  }
  // else{
  //   prompt("Wrong password mate");
  // }
}
