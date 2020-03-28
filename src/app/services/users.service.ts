import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

  // ----------------------  GET  ----------------------

  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/api/users`)
  };

  getUserById(id) {
    return this.http.get<any>(`${this.apiUrl}/api/users/${id}`)
  };

  // getExcelUsers() { };

  getUserFiles() {
    return this.http.get<any>(`${this.apiUrl}/api/user_files`)
  };

  getUserFilesById(id) {
    return this.http.get<any>(`${this.apiUrl}/api/user_files/${id}`)
  };

  // ----------------------  END GET  ----------------------

  // ----------------------  PUT  ----------------------

  putUserById(id, options) {
    return this.http.put(`${this.apiUrl}/api/users/${id}`, options, {
      reportProgress: true,
      observe: 'events',
    })
  }
  // putUserById(id, options) {
  //   return this.http.put(`${this.apiUrl}/api/users/${id}`, options, {
  //     reportProgress: true,
  //     observe: 'events',
  //   })
  // }

  // ----------------------  END PUT  ----------------------

  // ----------------------  POST  ----------------------

  postUser(options) {
    return this.http.post<any>(`${this.apiUrl}/api/users`, options, {
      reportProgress: true,
      observe: 'events'
    });
  };

  posrUserFileById(id, formData) {
    return this.http.post<any>(`${this.apiUrl}/api/user_files/${id}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // ----------------------  END POST  ----------------------

  // ----------------------  DELETE  ----------------------

  deleteUserById(id){
    return this.http.delete(`${this.apiUrl}/api/users/${id}`);
  }

  deleteUserFileById(id){
    return this.http.delete(`${this.apiUrl}/api/user_files/${id}`);
  }

  // ----------------------  END DELETE  ----------------------

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
}
