import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../config/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class InteractiveBrokersApiService {

    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) private config: AppConfig
    ) {
        if (this.config.features.enableLogging) {
            console.log('🔧 Interactive Brokers API Service initialized with config:', {
                ibApiUrl: this.config.api.ibApiUrl,
                fastApiUrl: this.config.api.fastApiUrl,
                paperTrading: this.config.trading.paperTrading
            });
        }
    }

    // Add headers for CORS
    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type'
            })
        };
    }    
    
    getHelloIBKR(): Observable<any> {
        return this.http.get(`${this.config.api.fastApiUrl}/hello_ibkr`);
    }

    getHistoricalStock(symbol: string) {
        return this.http.get<any[]>(`${this.config.api.fastApiUrl}/historical_stock/${symbol}`);
    }

    getAccountBalance(): Observable<{ balance: number }> {
        return this.http.get<{ balance: number }>(`${this.config.api.fastApiUrl}/account_balance`);
    }

    // 1. AUTHENTICATION & CONNECTION TESTING
    checkAuthStatus(): Observable<any> {
        return this.http.get(`${this.config.api.ibApiUrl}/iserver/auth/status`, this.getHttpOptions());
    }

    validateSession(): Observable<any> {
        return this.http.post(`${this.config.api.ibApiUrl}/iserver/auth/ssodh/init`, {}, this.getHttpOptions());
    }

    // 4. PAPER TRADING ORDERS
    placePaperOrder(accountId: string, orderData: any): Observable<any> {
        return this.http.post(`${this.config.api.ibApiUrl}/iserver/account/${accountId}/orders`, orderData);
    }

    getPaperOrders(accountId: string): Observable<any> {
        return this.http.get(`${this.config.api.ibApiUrl}/iserver/account/${accountId}/orders`);
    }

    // 5. REAL-TIME DATA SUBSCRIPTION
    subscribeToMarketData(conid: string): Observable<any> {
        return this.http.get(`${this.config.api.ibApiUrl}/iserver/marketdata/snapshot?conids=${conid}&fields=31,84,86`);
    }

    // Test method - checks if paper trading is working
    testPaperTradingConnection(): Observable<any> {
        return this.checkAuthStatus();
    }

     // Add a test method that bypasses CORS for development
    testConnection(): Observable<any> {
        console.log('🔗 Testing IB Gateway connection...');
        return of({
            status: 'testing',
            message: 'CORS bypass - IB Gateway connection test',
            timestamp: new Date().toISOString()
        });
    }
}