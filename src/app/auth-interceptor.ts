import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiKey = environment.apiKey;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${this.apiKey}` }
    });
    return next.handle(clonedRequest);
  }
}
