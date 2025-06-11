import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FastApiService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getHelloIBKR(): Observable<any> {
    return this.http.get(`${this.baseUrl}/hello_ibkr`);
  }

  getHistoricalStock(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/historical_stock/${symbol}`);
  }

  getAccountBalance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/account_balance`);
  }
}
