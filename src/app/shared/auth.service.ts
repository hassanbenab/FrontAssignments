import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  
  loggedIn = false;

  logIn(email: string, password: string) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {email: email, password: password});
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    // renvoie une promesse !
    return isUserAdmin;
  }

  constructor(private http:HttpClient) { }

  register(user: User) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
  }

  toggleLoggedIn() {
    this.loggedIn = !this.loggedIn;
  }

  
  isLoggedIn() {
    return this.loggedIn;
  }
}
