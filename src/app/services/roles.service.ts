import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

// -----------------------GET------------------------------------
// -----------------------GET------------------------------------
// GET /api/roles/{id}
// GET /api/roles



  getRoles(){
    return this.http.get(`${this.apiUrl}/api/roles`)
  }
  getRoleById(id){
    return this.http.get(`${this.apiUrl}/api/roles/${id}`)
  }

// -----------------------END_GET------------------------------------
// -----------------------END_GET------------------------------------

// -----------------------PUT------------------------------------
// -----------------------PUT------------------------------------
// PUT /api/roles/{id}
// PUT /api/roles/file/{id}

putRole(id, option ){
  return this.http.put(`${this.apiUrl}/api/roles/${id}`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_PUT------------------------------------
// -----------------------END_PUT------------------------------------

// -----------------------POT------------------------------------
// -----------------------POT------------------------------------
// POST /api/roles
// POST /api/roles/{id}
// POST /api/roles/file/{id}

postRole(id, option ){
  return this.http.post(`${this.apiUrl}/api/roles`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_POT------------------------------------
// -----------------------END_POT------------------------------------

// -----------------------DELETE------------------------------------
// -----------------------DELETE------------------------------------
// DELETE /api/roles/{id}

deleteRoleId(id){
  return this.http.delete(`${this.apiUrl}/api/roles/${id}`);
}

// -----------------------END_DELETE------------------------------------
// -----------------------END_DELETE------------------------------------
}



