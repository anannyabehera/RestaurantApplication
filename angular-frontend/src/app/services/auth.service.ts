import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3550'; // Replace with your API URL
  withCredential: object = {
    withCredentials: true

  }
  constructor(private http: HttpClient,
    private router: Router,) {}

    register(user: any): Observable<any> {
      console.log('service', user);
      
      const registerUrl = `${this.apiUrl}/auth/register`;
      return this.http.post(registerUrl, user);
    }

    login(user: any): Observable<any> {
      console.log('service', user);
      
      const loginUrl = `${this.apiUrl}/auth/login`;
      return this.http.post(loginUrl, user, { responseType: 'json' });
    } 
}
