
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
  import { map, catchError } from 'rxjs/operators';
  import { Observable, throwError } from 'rxjs';
  import { environment } from '../../environments/environment';
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class DepartmentsService {
  
    get apiUrl(): string {
      return environment.apiUrl;
    }
  
    constructor(private http: HttpClient) { }
  
  // -----------------------GET------------------------------------
  // -----------------------GET------------------------------------
  // GET /api/department/{id}
  // GET /api/department
  // GET /api/department/export

  
    getDepartments(){
      return this.http.get(`${this.apiUrl}/api/department`)
    }
    getDepartmentById(id){
      return this.http.get(`${this.apiUrl}/api/department/${id}`)
    }
    getDepartmentsExport(){
      return this.http.get(`${this.apiUrl}/api/department/export`)
    }
  
  // -----------------------END_GET------------------------------------
  // -----------------------END_GET------------------------------------
  
  // -----------------------PUT------------------------------------
  // -----------------------PUT------------------------------------
  // PUT /api/department/{id}  
  putDepartment(id, option ){
    return this.http.put(`${this.apiUrl}/api/department`, option, {
      reportProgress: true,
      observe: 'events',
    })
  }
  
  // -----------------------END_PUT------------------------------------
  // -----------------------END_PUT------------------------------------
  
  // -----------------------POT------------------------------------
  // -----------------------POT------------------------------------
  // POST /api/department
  
  postDepartment(id, option ){
    return this.http.post(`${this.apiUrl}/api/department`, option, {
      reportProgress: true,
      observe: 'events',
    })
  }
  
  // -----------------------END_POT------------------------------------
  // -----------------------END_POT------------------------------------
  
  // -----------------------DELETE------------------------------------
  // -----------------------DELETE------------------------------------
  // DELETE /api/department/{id}
  
  deleteDepartmentId(id){
    return this.http.delete(`${this.apiUrl}/api/department/${id}`);
  }
  
  // -----------------------END_DELETE------------------------------------
  // -----------------------END_DELETE------------------------------------
  
  }
  
  
