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

  getAll() {
    return this.http.get(`${this.apiUrl}/api/users`)
  };

  getById(id) {
    return this.http.get(`${this.apiUrl}/api/users/${id}`)
  };

  // getExcelUsers() { };

  getAllFiles() {
    return this.http.get(`${this.apiUrl}/api/user_files`)
  };

  getFile(id) {
    return this.http.get(`${this.apiUrl}/api/user_files/${id}`)
  };

  // ----------------------  END GET  ----------------------

  // ----------------------  PUT  ----------------------

  put(id, options) {
    return this.http.put(`${this.apiUrl}/api/users/${id}`, options, {
      reportProgress: true,
      observe: 'events',
    })
  }
  putFile(id, formData) {
    return this.http.post(`${this.apiUrl}/api/user_files/${id}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // ----------------------  END PUT  ----------------------

  // ----------------------  POST  ----------------------

  post(options) {
    return this.http.post(`${this.apiUrl}/api/users`, options);
  };

  postFile(id, formData) {
    return this.http.post(`${this.apiUrl}/api/user_files/${id}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // ----------------------  END POST  ----------------------

  // ----------------------  DELETE  ----------------------

  delete(id){
    return this.http.delete(`${this.apiUrl}/api/users/${id}`);
  }

  deleteFile(id){
    return this.http.delete(`${this.apiUrl}/api/user_files/${id}`);
  }
}
