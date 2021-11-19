import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  getUserDetails(emailId) : Observable<any>{
    return this._http.get<any>('http://localhost:8080/users?email=' + emailId).pipe(
      map((response) => response),
      catchError(this.handleError));
  }
  private handleError(error) {
    console.error(error);
    return throwError(error || 'Product error');
  }
}
