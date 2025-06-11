import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip, ChartConfiguration, ChartType } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip);

export interface ChartDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: ChartDataPoint[] = [];
  @Input() symbol: string = '';
  @Input() metric: 'open' | 'high' | 'low' | 'close' = 'close';
  @Input() chartType: ChartType = 'line';
  @Input() title: string = 'Stock Price Chart';
  @Input() color: string = 'rgb(54, 162, 235)';
  @Input() height: number = 400;
  @Input() showMetricSelector: boolean = true;

  chartData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration['options'] = {};

  ngOnInit() {
    this.initializeChart();
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['metric'] || changes['symbol']) {
      this.updateChartData();
    }
    if (changes['title'] || changes['color']) {
      this.initializeChart();
    }
  }

  private initializeChart() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: this.title || `${this.symbol} ${this.metric.toUpperCase()} Price`
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Price ($)'
          },
          ticks: {
            callback: function(value) {
              return '$' + Number(value).toFixed(2);
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.1
        },
        point: {
          radius: 3,
          hoverRadius: 6
        }
      }
    };
  }

  private updateChartData() {
    if (!this.data || this.data.length === 0) {
      this.chartData = { labels: [], datasets: [] };
      return;
    }

    const labels = this.data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString();
    });

    const values = this.data.map(item => item[this.metric]);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: `${this.symbol || 'Stock'} ${this.metric.toUpperCase()} Price`,
          data: values,
          borderColor: this.color,
          backgroundColor: this.color + '20', // Add transparency
          fill: false,
          tension: 0.1,
          pointBackgroundColor: this.color,
          pointBorderColor: this.color,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: this.color
        }
      ]
    };
  }

  onMetricChange() {
    this.updateChartData();
  }

  getMetricDisplayName(metric: string): string {
    return metric.charAt(0).toUpperCase() + metric.slice(1);
  }
}
