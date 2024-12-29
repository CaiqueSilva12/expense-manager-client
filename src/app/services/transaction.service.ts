import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, switchMap } from 'rxjs/operators';

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  category: string;
  description: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createTransaction(transactionData: {
    user: string;
    type: string;
    category: string;
    amount: number;
    description: string;
    month: number;
    year: number;
  }): Observable<Transaction[]> {
    return this.httpClient
      .post<void>(`${this.apiUrl}/api/transactions`, transactionData)
      .pipe(
        switchMap(() =>
          this.getTransactions(transactionData.user, transactionData.month, transactionData.year)
        )
      );
  }

  getTransactions(userId: string, month: number, year: number): Observable<Transaction[]> {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());

    return this.httpClient.get<Transaction[]>(`${this.apiUrl}/api/transactions/${userId}`, { params });
  }
}
