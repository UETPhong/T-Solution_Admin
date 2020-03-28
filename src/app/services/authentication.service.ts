import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string ) {
    return this.http.post(`${this.apiUrl}/api/login`, { "username":username, "password":password }).pipe(map(user =>{
      if(user['success'] == true){
        localStorage.setItem("currentUser", JSON.stringify(user['data']));
        this.currentUserSubject.next(user['data']);
      }
      return user;      
    }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}


public get loggedIn(): boolean {
  return localStorage.getItem('currentUser') !== null;
}
}
