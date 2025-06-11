import { Component } from '@angular/core';
import { StrategyBacktestingService } from '../../services/strategy-backtesting.service';
import { InteractiveBrokersApiService } from '../../services/interactive-brokers-api.service';
import { FastApiService } from '../../services/fastapi.service';




@Component({
  selector: 'app-your-component',
  templateUrl: './strategy-selection.component.html',
  styleUrls: ['./strategy-selection.component.scss']
})
export class YourComponent {
  constructor(
    private backtestService: StrategyBacktestingService,
    private ibService: InteractiveBrokersApiService,
    private fastApiService: FastApiService
  ) {}

  fetchIBKRData(): void {
    this.fastApiService.getHelloIBKR().subscribe(
      (data: { connected: boolean; symbol: string; latest_price: number }) => {
        console.log('IBKR Data:', data);
        alert(`Connected: ${data.connected}, Symbol: ${data.symbol}, Latest Price: ${data.latest_price}`);
      },
      (error: any) => {
        console.error('Error fetching IBKR data:', error);
      }
    );
  }

  fetchHistoricalStock(symbol: string): void {
    this.fastApiService.getHistoricalStock(symbol).subscribe(
      (data: Array<{ date: string; open: number; high: number; low: number; close: number; volume: number }>) => {
        console.log(`Historical Data for ${symbol}:`, data);
      },
      (error: any) => {
        console.error(`Error fetching historical data for ${symbol}:`, error);
      }
    );
  }
}