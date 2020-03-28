import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post(`${this.apiUrl}/api/login`, { 'username':username , 'password':password }).subscribe(r => {
      localStorage.setItem('access_token', r['data']['token']);
      console.log(localStorage.getItem('access_token'));
    })
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

    // register(email: string, password: string) {
  //   return this.httpClient.post<{ access_token: string }>('http://www.your-server.com/auth/register', { email, password }).pipe(tap(res => {
  //     this.login(email, password)
  //   }))
  // }
}
