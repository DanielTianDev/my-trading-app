import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractiveBrokersApiService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getAccountBalance(): Observable<{ balance: number }> {
    // Dummy implementation for account balance
    return of({ balance: 5000 });
  }
}
