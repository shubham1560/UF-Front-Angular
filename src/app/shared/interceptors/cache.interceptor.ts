import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';

import { CacheserviceService  } from '../../services/cacheservice/cacheservice.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor{

    constructor(private cacheService: CacheserviceService){};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cachedResponse: HttpResponse<any> = this.cacheService.read(req.url);

        var excluded_keywords = ['get_user_data', 'history/get/'];

        if(req.method != "GET"){
            return next.handle(req);
        }

        if(cachedResponse){
            // console.log("returning from cache");
            // console.log(req.url)
            // console.log("returning from cache");

            return of(cachedResponse);
        }
        var not_to_be_cached = false;
        return next.handle(req)
        .pipe(
            tap(event => {
                if (event instanceof HttpResponse){
                    excluded_keywords.forEach(element => {
                        if(req.url.includes(element)){
                            not_to_be_cached = true;
                        }
                    });
                    if (!not_to_be_cached){
                        this.cacheService.create(req.url, event);
                    }

                }
            })
        )

    }
    
}