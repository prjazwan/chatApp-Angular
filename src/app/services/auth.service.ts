import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(body: any): Observable<any> {
    return this.http.post<any>(`${BASEURL}/register`, body);
  }

  loginUser(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/login`, body);
  }
}
