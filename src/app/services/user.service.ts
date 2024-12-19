import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

type CreateUserResponse = {
  message: string;
}

type GetUserResponse = {
  balance: number;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createUser(name: string, email: string, password: string): Observable<CreateUserResponse> {
    return this.httpClient.post<CreateUserResponse>(`${this.apiUrl}/api/users`, { name, email, password });
  }

  getUserBalance(email: string): Observable<GetUserResponse> {
    return this.httpClient.get<GetUserResponse>(`${this.apiUrl}/api/users/${email}`);
  }
}
