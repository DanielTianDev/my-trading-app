import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../config/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class FastApiService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  getHelloIBKR(): Observable<any> {
    return this.http.get(`${this.config.api.fastApiUrl}/hello_ibkr`);
  }

  getHistoricalStock(symbol: string): Observable<any> {
    return this.http.get(`${this.config.api.fastApiUrl}/historical_stock/${symbol}`);
  }

  getAccountBalance(): Observable<any> {
    return this.http.get(`${this.config.api.fastApiUrl}/account_balance`);
  }
}
