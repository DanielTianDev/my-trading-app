import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import * as dashboardSelectors from '../../store/dashboard/dashboard.selectors';
import { dashboardActions } from '../../store/dashboard/dashboard.actions';
import { ChartComponent, ChartDataPoint } from '../chart/chart.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PushPipe, FormsModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedMetric: 'open' | 'high' | 'low' | 'close' = 'close';
  symbolInput: string = ''; // Default input value

  get dashboardMessage$() {
    return this.store.select(dashboardSelectors.selectDashboardMessage);
  }

  get dashboardData$(): Observable<ChartDataPoint[]> {
    return this.store.select(dashboardSelectors.selectData).pipe(
      map(data => data || [])
    );
  }

  get dataLength$() {
    return this.store.select(dashboardSelectors.selectDataLength);
  }
  ngOnInit() {
    // Chart component will handle data subscription internally
    // No need to manually manage chart data here anymore
  }

  constructor(private store: Store) { 
    this.runAllIBTests();
  }

  onMetricChange() {
    console.log('Metric changed to:', this.selectedMetric);
  }

  // Updated test methods with better error handling
  testIBGateway() {
      console.log('🔧 Testing IB Gateway (may have CORS issues)...');
      this.store.dispatch(dashboardActions.loadHistoricalStock({ symbol: this.symbolInput }));
      
  }

  runAllIBTests() {
      console.log('🚀 Starting IB Gateway Tests...');
      console.log('⚠️ Note: CORS errors are expected in browser - this is normal');
      this.testIBGateway();
  }

  // Manual test button method
  manualIBTest() {
      this.testIBGateway();
  }

}