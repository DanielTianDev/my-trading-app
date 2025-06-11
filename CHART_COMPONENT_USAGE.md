# Chart Component Usage Guide

The `ChartComponent` is a reusable Angular component for displaying stock price charts. It uses Chart.js under the hood and supports multiple price metrics.

## Basic Usage

```typescript
// In your component
import { ChartComponent, ChartDataPoint } from '../chart/chart.component';

@Component({
  imports: [ChartComponent],
  // ... other config
})
export class YourComponent {
  chartData: ChartDataPoint[] = [
    { date: '2024-01-01', open: 100, high: 105, low: 98, close: 103 },
    { date: '2024-01-02', open: 103, high: 108, low: 102, close: 106 },
    // ... more data
  ];
  
  selectedSymbol = 'AAPL';
  selectedMetric: 'open' | 'high' | 'low' | 'close' = 'close';
}
```

```html
<!-- In your template -->
<app-chart
  [data]="chartData"
  [symbol]="selectedSymbol"
  [metric]="selectedMetric"
  [title]="'Stock Price Chart'"
  [color]="'rgb(54, 162, 235)'"
  [height]="400"
  [showMetricSelector]="true">
</app-chart>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `ChartDataPoint[]` | `[]` | Array of price data points |
| `symbol` | `string` | `''` | Stock symbol for display |
| `metric` | `'open' \| 'high' \| 'low' \| 'close'` | `'close'` | Which price metric to display |
| `chartType` | `ChartType` | `'line'` | Chart.js chart type |
| `title` | `string` | `'Stock Price Chart'` | Chart title |
| `color` | `string` | `'rgb(54, 162, 235)'` | Line color |
| `height` | `number` | `400` | Chart height in pixels |
| `showMetricSelector` | `boolean` | `true` | Show metric selector dropdown |

## Data Format

```typescript
interface ChartDataPoint {
  date: string;    // ISO date string or date that can be parsed
  open: number;    // Opening price
  high: number;    // High price
  low: number;     // Low price
  close: number;   // Closing price
}
```

## Examples

### 1. Simple Price Chart
```html
<app-chart
  [data]="stockData"
  [symbol]="'AAPL'"
  [metric]="'close'"
  [title]="'Apple Stock Price'"
  [showMetricSelector]="false">
</app-chart>
```

### 2. Interactive Chart with Metric Selector
```html
<app-chart
  [data]="stockData"
  [symbol]="currentSymbol"
  [metric]="selectedMetric"
  [title]="currentSymbol + ' Price Analysis'"
  [color]="'rgb(75, 192, 192)'"
  [height]="500"
  [showMetricSelector]="true">
</app-chart>
```

### 3. Multiple Charts with Different Metrics
```html
<div class="chart-grid">
  <app-chart
    [data]="stockData"
    [symbol]="symbol"
    [metric]="'high'"
    [title]="'Daily Highs'"
    [color]="'rgb(255, 99, 132)'"
    [showMetricSelector]="false">
  </app-chart>
  
  <app-chart
    [data]="stockData"
    [symbol]="symbol"
    [metric]="'low'"
    [title]="'Daily Lows'"
    [color]="'rgb(54, 162, 235)'"
    [showMetricSelector]="false">
  </app-chart>
</div>
```

### 4. Responsive Chart
```html
<div class="responsive-chart-container">
  <app-chart
    [data]="stockData"
    [symbol]="symbol"
    [metric]="selectedMetric"
    [height]="windowHeight * 0.4"
    [showMetricSelector]="true">
  </app-chart>
</div>
```

## Integration with NgRx Store

```typescript
export class TradingComponent {
  stockData$ = this.store.select(selectStockData);
  
  constructor(private store: Store) {}
  
  loadData(symbol: string) {
    this.store.dispatch(loadStockData({ symbol }));
  }
}
```

```html
<app-chart
  [data]="(stockData$ | async) || []"
  [symbol]="selectedSymbol"
  [metric]="selectedMetric">
</app-chart>
```

## Styling Customization

The component includes built-in responsive design and dark mode support. You can customize the appearance by overriding CSS variables:

```scss
app-chart {
  --chart-background: #ffffff;
  --chart-border: #e0e0e0;
  --chart-text: #333333;
}

// Dark mode
@media (prefers-color-scheme: dark) {
  app-chart {
    --chart-background: #1a1a1a;
    --chart-border: #333333;
    --chart-text: #ffffff;
  }
}
```

## Performance Tips

1. **Limit Data Points**: For better performance, limit the number of data points (e.g., last 365 days)
2. **Lazy Loading**: Use `OnPush` change detection strategy when possible
3. **Virtual Scrolling**: For large datasets, consider implementing virtual scrolling
4. **Memoization**: Use `trackBy` functions when displaying multiple charts

## Error Handling

The component gracefully handles:
- Empty data arrays (shows "No data available" message)
- Invalid date formats (falls back to array index)
- Missing price values (skips data points)
- Network failures (through parent component error handling)
