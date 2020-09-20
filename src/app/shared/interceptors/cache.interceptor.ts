import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';

import { CacheserviceService  } from '../../services/cacheservice/cacheservice.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor{

    constructor(private cacheService: CacheserviceService){};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(req);

        const cachedResponse: HttpResponse<any> = this.cacheService.read(req.url);

        if(req.method != "GET"){
            return next.handle(req);
        }

        // console.log(this.cacheService.getCache());

        if(cachedResponse){
            // console.log("Response from cache: ");
            // console.log(cachedResponse);
            return of(cachedResponse);
        }

        return next.handle(req)
        .pipe(
            tap(event => {
                if (event instanceof HttpResponse){
                    // console.log("response from server");
                    // console.log(event);
                    this.cacheService.create(req.url, event);
                    // console.log(this.cacheService);
                }
            })
        )

    }
    
}