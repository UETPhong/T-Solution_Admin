import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityProvincesService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

  // -----------------------GET------------------------------------
  // -----------------------GET------------------------------------
  // GET /api/cityProvinces
  // GET /api/cityProvinces/{id}



  getCityProvinces() {
    return this.http.get(`${this.apiUrl}/api/cityProvinces`)
  }
  getCityProvinceById(id) {
    return this.http.get(`${this.apiUrl}/api/cityProvinces/${id}`)
  }

  // -----------------------END_GET------------------------------------
  // -----------------------END_GET------------------------------------

  // -----------------------PUT------------------------------------
  // -----------------------PUT------------------------------------
  // PUT /api/cityProvinces/{id}  
  putCityProvince(id, option) {
    return this.http.put(`${this.apiUrl}/api/cityProvinces/${id}`, option, {
      reportProgress: true,
      observe: 'events',
    })
  }

  // -----------------------END_PUT------------------------------------
  // -----------------------END_PUT------------------------------------

  // -----------------------POT------------------------------------
  // -----------------------POT------------------------------------
  // POST /api/cityProvinces

  postCityProvince(options) {
    return this.http.post(`${this.apiUrl}/api/cityProvinces`, options, {
      reportProgress: true,
      observe: 'events',
    })
  }

  // -----------------------END_POT------------------------------------
  // -----------------------END_POT------------------------------------

  // -----------------------DELETE------------------------------------
  // -----------------------DELETE------------------------------------
  // DELETE /api/cityProvinces/{id}

  deleteCityProvinceId(id) {
    return this.http.delete(`${this.apiUrl}/api/cityProvinces/${id}`);
  }

  // -----------------------END_DELETE------------------------------------
  // -----------------------END_DELETE------------------------------------

}


