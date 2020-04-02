import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

  // -----------------------GET------------------------------------
  // -----------------------GET------------------------------------
  // GET /api/candidates/{id}
  // GET /api/candidates



  getAll() {
    return this.http.get(`${this.apiUrl}/api/candidates`)
  }
  getById(id) {
    return this.http.get(`${this.apiUrl}/api/candidates/${id}`)
  }

  // -----------------------END_GET------------------------------------
  // -----------------------END_GET------------------------------------

  // -----------------------PUT------------------------------------
  // -----------------------PUT------------------------------------
  // PUT /api/candidates/{id}
  // PUT /api/candidates/file/{id}

  putSelected(id, options) {
    return this.http.put(`${this.apiUrl}/api/candidates/${id}`, options)
  }
  putFile(id, file) {
    return this.http.put(`${this.apiUrl}/api/candidates/file/${id}`, file, {
      reportProgress: true,
      observe: 'events',
    })
  }

  // -----------------------END_PUT------------------------------------
  // -----------------------END_PUT------------------------------------

  // -----------------------POT------------------------------------
  // -----------------------POT------------------------------------
  // POST /api/candidates/{id}
  // POST /api/candidates
  // POST /api/candidates/file/{id}

  post(options) {
    return this.http.post(`${this.apiUrl}/api/candidates`, options)
  }
  postFile(id, file) {
    return this.http.post(`${this.apiUrl}/api/candidates/file/${id}`, file, {
      reportProgress: true,
      observe: 'events',
    })
  }

  // -----------------------END_POT------------------------------------
  // -----------------------END_POT------------------------------------

  // -----------------------DELETE------------------------------------
  // -----------------------DELETE------------------------------------
  // DELETE /api/candidates/{id}

  deleteSelected(id) {
    return this.http.delete(`${this.apiUrl}/api/candidates/${id}`);
  }

  // -----------------------END_DELETE------------------------------------
  // -----------------------END_DELETE------------------------------------

}



