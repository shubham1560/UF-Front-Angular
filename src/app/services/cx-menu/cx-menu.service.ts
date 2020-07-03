import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CxMenuService {

  constructor() { }

  logData(id: string, data:{}){
    var a = document.getElementById(id);
    a["data"] = data;
    a.addEventListener("contextmenu", function(event){
      console.log(a["data"]);
    })
  }
}
