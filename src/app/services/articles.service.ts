import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

// -----------------------GET------------------------------------
// -----------------------GET------------------------------------
// GET /api/articles/{id}
// GET /api/articles



  getArticles(){
    return this.http.get(`${this.apiUrl}/api/articles`)
  }
  getArticleById(id){
    return this.http.get(`${this.apiUrl}/api/articles/${id}`)
  }

// -----------------------END_GET------------------------------------
// -----------------------END_GET------------------------------------

// -----------------------PUT------------------------------------
// -----------------------PUT------------------------------------
// PUT /api/articles/{id}
// PUT /api/articles/file/{id}

putArticle(id, option ){
  return this.http.put(`${this.apiUrl}/api/articles`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_PUT------------------------------------
// -----------------------END_PUT------------------------------------

// -----------------------POT------------------------------------
// -----------------------POT------------------------------------
// POST /api/articles
// POST /api/articles/{id}
// POST /api/articles/file/{id}

postArticle(id, option ){
  return this.http.post(`${this.apiUrl}/api/articles`, option, {
    reportProgress: true,
    observe: 'events',
  })
}

// -----------------------END_POT------------------------------------
// -----------------------END_POT------------------------------------

// -----------------------DELETE------------------------------------
// -----------------------DELETE------------------------------------
// DELETE /api/articles/{id}

deleteArticleId(id){
  return this.http.delete(`${this.apiUrl}/api/articles/${id}`);
}

// -----------------------END_DELETE------------------------------------
// -----------------------END_DELETE------------------------------------
}


