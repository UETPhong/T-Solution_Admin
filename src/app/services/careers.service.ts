import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CareersService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

// -----------------------GET------------------------------------
// -----------------------GET------------------------------------
// GET /api/careers
// GET /api/careers/{id}



  getCareers(){
    return this.http.get(`${this.apiUrl}/api/careers`)
  }
  getCareerById(id){
    return this.http.get(`${this.apiUrl}/api/careers/${id}`)
  }

// -----------------------END_GET------------------------------------
// -----------------------END_GET------------------------------------

// -----------------------PUT------------------------------------
// -----------------------PUT------------------------------------
// PUT /api/careers/{id}  
putCareer(id, option ){
  return this.http.put(`${this.apiUrl}/api/careers`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_PUT------------------------------------
// -----------------------END_PUT------------------------------------

// -----------------------POT------------------------------------
// -----------------------POT------------------------------------
// POST /api/careers

postCareer(id, option ){
  return this.http.post(`${this.apiUrl}/api/careers`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_POT------------------------------------
// -----------------------END_POT------------------------------------

// -----------------------DELETE------------------------------------
// -----------------------DELETE------------------------------------
// DELETE /api/careers/{id}

deleteCareerId(id){
  return this.http.delete(`${this.apiUrl}/api/careers/${id}`);
}

// -----------------------END_DELETE------------------------------------
// -----------------------END_DELETE------------------------------------

}


