import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MVPStrategyService, MVPTradeSignal } from '../../services/mvp-strategy.service';
import { RiskManagementService, TradeRisk } from '../../services/risk-management.service';
import { Store } from '@ngrx/store';
import { dashboardActions } from '../../store/dashboard/dashboard.actions';
import * as dashboardSelectors from '../../store/dashboard/dashboard.selectors';
import { ChartComponent, ChartDataPoint } from '../chart/chart.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PushPipe } from '@ngrx/component';

@Component({
    selector: 'app-trading-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, ChartComponent, PushPipe],
    templateUrl: './trading-dashboard.component.html',
    styleUrls: ['./trading-dashboard.component.scss']
})
export class TradingDashboardComponent implements OnInit {
    selectedSymbol = 'VOO';
    currentSignal: MVPTradeSignal | null = null;
    currentRisk: TradeRisk | null = null;
    signalHistory: MVPTradeSignal[] = [];
    strategyStats: any = {};
    realMarketData: any = null;
    isLoading = false;
    isTestingConnection = false;
    isBalanceVisible = true;
    
    // Chart data properties
    chartData: ChartDataPoint[] = [];
    selectedMetric: 'open' | 'high' | 'low' | 'close' = 'close';

    // Custom chart controls
    customEndDate: string = '';
    customDuration: string = '1 M';
    customBarSize: string = '1 day';
    customWhatToShow: string = 'TRADES';
    customChartData: ChartDataPoint[] | null = null;

    get accountBalance$() {
        return this.store.select(dashboardSelectors.selectAccountBalance);
    }

    get dashboardData$(): Observable<ChartDataPoint[]> {
        return this.store.select(dashboardSelectors.selectData).pipe(
            map(data => data || [])
        );
    }

    get customChartData$(){
        return this.store.select(dashboardSelectors.selectCustomChartData);
    }

    constructor(
        private mvpStrategy: MVPStrategyService,
        private riskManagement: RiskManagementService,
        private http: HttpClient,
        private store: Store 
    ) {}

    ngOnInit() {
        this.strategyStats = this.mvpStrategy.getStrategyStats();
        this.generateSignal(); // Generate initial signal
        this.testIBKRConnection(); // Test connection on startup
        this.store.dispatch(dashboardActions.loadAccountBalance());
        
        // Load historical data for chart
        this.loadHistoricalData();
        
        // Subscribe to chart data updates
        this.dashboardData$.subscribe(data => {
            this.chartData = data;
        });
    }
    
    loadHistoricalData() {
        if (this.selectedSymbol) {
            //this.store.dispatch(dashboardActions.loadHistoricalStock({ symbol: this.selectedSymbol }));
            const params = {
                symbol: this.selectedSymbol,
                end_date: this.customEndDate,
                duration_str: this.customDuration,
                bar_size_setting: this.customBarSize,
                what_to_show: this.customWhatToShow
            };
            this.store.dispatch(dashboardActions.loadHistoricalStockCustom({
                symbol: this.selectedSymbol,
                end_date: this.customEndDate,
                duration_str: this.customDuration,
                bar_size_setting: this.customBarSize,
                what_to_show: this.customWhatToShow
            }));
        }
    }

    refreshAccountBalance() {
        this.store.dispatch(dashboardActions.loadAccountBalance());
    }

    toggleBalanceVisibility() {
        this.isBalanceVisible = !this.isBalanceVisible;
    }


    generateSignal(symbol?: string) {
        const targetSymbol = symbol || this.selectedSymbol.toUpperCase();
        if (!targetSymbol) return;

        this.isLoading = true;
        
        // Load historical data for the new symbol
        if (symbol && symbol !== this.selectedSymbol) {
            this.store.dispatch(dashboardActions.loadHistoricalStock({ symbol: targetSymbol }));
        }
        
        this.mvpStrategy.generateMVPSignal(targetSymbol).subscribe({
            next: (signal) => {
                this.currentSignal = signal;
                
                // Calculate risk if it's a buy/sell signal
                if (signal.action !== 'HOLD') {
                    this.currentRisk = this.riskManagement.calculateTradeRisk(
                        signal.targetPrice * 0.97, // Approximate entry price
                        signal.targetPrice,
                        signal.positionSize,
                        signal.confidence
                    );
                } else {
                    this.currentRisk = null;
                }
                
                this.addToHistory(signal);
                this.isLoading = false;
                if (symbol) this.selectedSymbol = symbol;
            },
            error: (error) => {
                console.error('Error generating signal:', error);
                this.isLoading = false;
            }
        });
    }

    testIBKRConnection() {
        this.isTestingConnection = true;
        // Try to call your Python backend first, fallback to mock
        this.http.get('http://localhost:8000/hello_ibkr').subscribe({
            next: (data) => {
                this.realMarketData = data;
                this.isTestingConnection = false;
                console.log('✅ Connected to real IBKR API:', data);
            },
            error: (error) => {
                console.log('❌ IBKR API unavailable, using mock data');
                // Fallback to mock service
                this.http.get('/api/hello_ibkr').subscribe({
                    next: (mockData) => {
                        this.realMarketData = mockData;
                        this.isTestingConnection = false;
                        console.log('📁 Using mock data:', mockData);
                    },
                    error: (mockError) => {
                        console.error('Mock service also failed:', mockError);
                        this.isTestingConnection = false;
                    }
                });
            }
        });
    }

    loadCustomChart() {
        // const params = {
        //     symbol: this.selectedSymbol,
        //     end_date: this.customEndDate,
        //     duration_str: this.customDuration,
        //     bar_size_setting: this.customBarSize,
        //     what_to_show: this.customWhatToShow
        // };
        // this.store.dispatch(dashboardActions.loadHistoricalStockCustom({
        //     symbol: this.selectedSymbol,
        //     end_date: this.customEndDate,
        //     duration_str: this.customDuration,
        //     bar_size_setting: this.customBarSize,
        //     what_to_show: this.customWhatToShow
        // }));
        // // this.http.get<any[]>('http://localhost:8000/historical_stock_custom/', { params }).subscribe({
        // //     next: (data) => {
        // //         // Map backend data to ChartDataPoint[] if needed
        // //         this.customChartData = data.map(bar => ({
        // //             date: bar.date,
        // //             open: bar.open,
        // //             high: bar.high,
        // //             low: bar.low,
        // //             close: bar.close,
        // //             volume: bar.volume
        // //         }));
        // //     },
        // //     error: (err) => {
        // //         console.error('Failed to load custom chart data', err);
        // //         this.customChartData = null;
        // //     }
        // // });
        // this.customChartData$?.subscribe(data => {
        //     this.customChartData = data || null;
        // });
        alert("This feature is not yet implemented. Please check back later.");
    }

    private addToHistory(signal: MVPTradeSignal) {
        this.signalHistory.unshift(signal);
        if (this.signalHistory.length > 10) {
            this.signalHistory = this.signalHistory.slice(0, 10);
        }
    }

    getSignalClass(action: string): string {
        switch (action) {
            case 'BUY': return 'signal-buy';
            case 'SELL': return 'signal-sell';
            case 'HOLD': return 'signal-hold';
            default: return '';
        }
    }

    getRiskClass(riskLevel: string): string {
        switch (riskLevel) {
            case 'LOW': return 'risk-low';
            case 'MEDIUM': return 'risk-medium';
            case 'HIGH': return 'risk-high';
            default: return '';
        }
    }
}
