import { TokenService } from './token.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const headersConfig: any = {
    //   'Content-Type': 'application/json',
    //    Accept: 'application/json'
    // };
    // const token = this.tokenService.GetToken();
    // if (token) {
    //   headersConfig['Authorization'] = `Bearer ${token}`;
    // }
    // const _req = req.clone({ setHeaders: headersConfig });
    // return next.handle(_req);

    
    const token = this.tokenService.GetToken();
    if (token) {
        req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(req);
  }
}
