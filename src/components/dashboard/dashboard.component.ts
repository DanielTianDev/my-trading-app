import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import * as dashboardSelectors from '../../store/dashboard/dashboard.selectors';
import { dashboardActions } from '../../store/dashboard/dashboard.actions';
import { BaseChartDirective } from 'ng2-charts';
import {Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip,  ChartConfiguration, ChartType } from 'chart.js';


Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,PushPipe,FormsModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  selectedMetric: 'open' | 'high' | 'low' | 'close' = 'close';
  chartType: ChartType = 'line';
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Stock Price'
      }
    }
  };

  symbolInput: string = ''; // Default input value

  get dashboardMessage$() {
    return this.store.select(dashboardSelectors.selectDashboardMessage);
  }

  get dashboardData$() {
    return this.store.select(dashboardSelectors.selectData);
  }

  get dataLength$() {
    return this.store.select(dashboardSelectors.selectDataLength);
  }

  // get tslaPrice$() {
  //   return this.store.select(selectTSLAPrice);
  // }

  // get tslaHistoricalData$() {
  //   // We'll implement this selector later
  //   return this.store.select(selectTSLAData);
  // } 

  historicalData: ChartConfiguration['data'] = { labels: [], datasets: [] };

  ngOnInit() {
    this.dashboardData$.subscribe(apiData => {
      if (apiData && Array.isArray(apiData) && apiData.length) {
        this.historicalData = {
          labels: apiData.map(item => item.date),
          datasets: [
            {
              label: `${this.symbolInput} ${this.selectedMetric} Price`,
              data: apiData.map(item => item[this.selectedMetric]),
              borderColor: 'blue',
              fill: false,
            }
          ]
        };
      }
    });
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