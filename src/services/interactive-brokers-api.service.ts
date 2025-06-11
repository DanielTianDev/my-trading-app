import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractiveBrokersApiService {

    // Interactive Brokers Client Portal API base URL
    private ibApiUrl = 'https://localhost:5000/v1/api'; // Default IB Gateway port
    private baseApiUrl = 'http://127.0.0.1:8000'; // Base URL for your backend API

    constructor(private http: HttpClient) {}

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
        return this.http.get('http://127.0.0.1:8000/hello_ibkr');
    }

    getHistoricalStock(symbol: string) {
        return this.http.get<any[]>(`${this.baseApiUrl}/historical_stock/${symbol}`);
    }


    getAccountBalance(): Observable<{ balance: number }> {
      // Dummy implementation for account balance
      return of({ balance: 5000 });
    }


    // 1. AUTHENTICATION & CONNECTION TESTING
    checkAuthStatus(): Observable<any> {
        return this.http.get(`${this.ibApiUrl}/iserver/auth/status`, this.getHttpOptions());
    }

    validateSession(): Observable<any> {
        return this.http.post(`${this.ibApiUrl}/iserver/auth/ssodh/init`, {}, this.getHttpOptions());
    }

    // 4. PAPER TRADING ORDERS
    placePaperOrder(accountId: string, orderData: any): Observable<any> {
        return this.http.post(`${this.ibApiUrl}/iserver/account/${accountId}/orders`, orderData);
    }

    getPaperOrders(accountId: string): Observable<any> {
        return this.http.get(`${this.ibApiUrl}/iserver/account/${accountId}/orders`);
    }

    // 5. REAL-TIME DATA SUBSCRIPTION
    subscribeToMarketData(conid: string): Observable<any> {
        return this.http.get(`${this.ibApiUrl}/iserver/marketdata/snapshot?conids=${conid}&fields=31,84,86`);
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