import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingApiService {

    private apiKey = '';

    constructor(private http: HttpClient) {}

    getTSLAPrice(): Observable<any> {
    // Example endpoint for TSLA quote
    return this.http.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=${this.apiKey}`);
    }

    getTSLAHistoricalData(): Observable<any> {
        // Monthly historical data for TSLA
        return this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=TSLA&apikey=${this.apiKey}`);
    }

    getTSLAHistoricalDataAdjusted(): Observable<any> {
        // Monthly historical data with dividend adjustments
        return this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=TSLA&apikey=${this.apiKey}`);
    }

    getTSLAWeeklyData(): Observable<any> {
        // Weekly historical data (gives you more granular data)
        return this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=TSLA&apikey=${this.apiKey}`);
    }
}