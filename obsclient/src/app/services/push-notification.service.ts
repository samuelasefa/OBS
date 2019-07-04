import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';

const SERVER_URL = 'http://localhost:8080/subscription';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor(private http: HttpClient) {}
postSubscription( sub: PushSubscription) {
    return this.http.post(SERVER_URL, sub).pipe(catchError(this.handlError));
  }
 handlError(error) {
   return throwError(error.error.message);
 }

}
