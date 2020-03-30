import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

// -----------------------GET------------------------------------
// -----------------------GET------------------------------------
// GET /api/banners/{id}
// GET /api/banners



  getBanners(){
    return this.http.get(`${this.apiUrl}/api/banners`)
  }
  getBannerById(id){
    return this.http.get(`${this.apiUrl}/api/banners/${id}`)
  }

// -----------------------END_GET------------------------------------
// -----------------------END_GET------------------------------------

// -----------------------PUT------------------------------------
// -----------------------PUT------------------------------------
// PUT /api/banners/{id}
// PUT /api/banners/file/{id}

putBanner(id, option ){
  return this.http.put(`${this.apiUrl}/api/banners/${id}`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_PUT------------------------------------
// -----------------------END_PUT------------------------------------

// -----------------------POT------------------------------------
// -----------------------POT------------------------------------
// POST /api/banners/{id}
// POST /api/banners
// POST /api/banners/file/{id}

postBanner(id, option ){
  return this.http.post(`${this.apiUrl}/api/banners`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_POT------------------------------------
// -----------------------END_POT------------------------------------

// -----------------------DELETE------------------------------------
// -----------------------DELETE------------------------------------
// DELETE /api/banners/{id}

deleteBannerId(id){
  return this.http.delete(`${this.apiUrl}/api/banners/${id}`);
}

// -----------------------END_DELETE------------------------------------
// -----------------------END_DELETE------------------------------------

}



