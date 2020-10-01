import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthorGuard implements CanActivate {
  
  constructor(
    private userProfile: UserprofileService,
    private httpClient: HttpClient,
    
  ){
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| Observable<boolean> {
      // console.log("guard!");
      // let imbdid = route.paramMap.get('imbdid');
      // return true;
      return this.httpClient.get(`${this.userProfile.base_userprofile_url}group/Author/`).pipe(
        map((res:boolean) => {
          console.log(res);
          // return res;
          if (res){
            return true;
          }
          else{
            window.location.href ="welcome";
            return false;
          }
          // if (res['Error']) {
          //   alert("Movie not found at guard!");
          //   return false;
          // } else {
          //   return true;
          // }
        }),
        // catchError((err) => {
        //   return of(false);
        // })
      );
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   throw new Error("Method not implemented.");
  // }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   // return this.isAuthor();
  //   return true 
  // }

  isAuthor(){
    this.userProfile.inGroup("Author").subscribe(
      (response:Boolean) => {
        if (response){
          return true;
        }
        else{
          return false;
        }
      }, error => {
        return false;
      }
    )
    // return true;
  }


  
}
