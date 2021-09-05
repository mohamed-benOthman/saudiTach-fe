import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next) {
    const authToken =  localStorage.getItem('access_token');
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken
      }
    });
    return next.handle(tokenizedReq);
  }
}
