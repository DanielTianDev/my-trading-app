import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BacktestResult {
  strategyId: string;
  timeframe: string;
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
}

@Injectable({
  providedIn: 'root'
})
export class StrategyBacktestingService {
  private dummyResults: BacktestResult[] = [
    {
      strategyId: 'SWING_MOMENTUM',
      timeframe: '1Y',
      totalReturn: 0.28,
      annualizedReturn: 0.28,
      sharpeRatio: 1.5,
      maxDrawdown: 0.15,
      winRate: 0.65,
      totalTrades: 120
    },
    {
      strategyId: 'MEAN_REVERSION_RSI',
      timeframe: '1Y',
      totalReturn: 0.22,
      annualizedReturn: 0.22,
      sharpeRatio: 1.2,
      maxDrawdown: 0.12,
      winRate: 0.60,
      totalTrades: 100
    }
  ];

  getBacktestResults(): Observable<BacktestResult[]> {
    return of(this.dummyResults);
  }
}
