import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { environment } from '../../../environment';

type LoginResponse = {
  token: string;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/api/login`, { email, password }).pipe(
      tap((response) => {        
        sessionStorage.setItem('auth-token', response.token);
        sessionStorage.setItem('username', response.user.name);
        sessionStorage.setItem('email', response.user.email);
        sessionStorage.setItem('userid', response.user.id);
      })
    );
  }
}
