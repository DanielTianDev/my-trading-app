import { createReducer, on } from '@ngrx/store';
import { dashboardActions } from './dashboard.actions';

export interface DashboardState {
  message: string;
  tslaPrice?: string;
  data?: any; // Optional, for historical data
  error?: any; // Optional, for error handling\
  dataLength?: number; // Optional, to track the length of data
  accountBalance?: number; // Optional, for account balance
}

export const initialState: DashboardState = {
  message: 'hello world',
  tslaPrice: '0.00',
  data: null,
  error: null,
  dataLength: 0 ,// Initialize dataLength to 0
  accountBalance: 0 // Initialize accountBalance to null
};

export const dashboardReducer = createReducer(
  initialState,

  on(dashboardActions.loadHelloIBKR, state => ({
    ...state,
    message: 'Loading...'
  })),

  on(dashboardActions.loadHelloIBKRSuccess, (state, { data }) => ({
      ...state,
      message: `Connected: ${data.connected}, Symbol: ${data.symbol}, Latest Price: ${data.latest_price}`
  })),

  on(dashboardActions.loadHelloIBKRFailure, (state, { error }) => ({
    ...state,
    message: `Error: ${error}`
  })),

  on(dashboardActions.loadHistoricalStock, (state, { symbol }) => ({
    ...state,
    message: `Loading historical data for ${symbol}...`
  })),

  on(dashboardActions.loadHistoricalStockSuccess, (state, { data }) => {
    // Compute a message based on the data
    let message = 'Historical data loaded.';
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];
      const last = data[data.length - 1];
      message = `Loaded ${data.length} days: ${first.date} to ${last.date}`;
    }
    return {
      ...state,
      data,
      message,
      dataLength: data.length,
    };
  }),

  on(dashboardActions.loadHistoricalStockFailure, (state, { error }) => ({
    ...state,
    error: `Error loading historical data: ${error}`
  })),

  on(dashboardActions.loadAccountBalance, state => ({
    ...state,
    message: 'Loading account balance...'
  })),

  on(dashboardActions.loadAccountBalanceSuccess, (state, { balance }) => ({
    ...state,
    accountBalance: balance,
    message: `Account balance loaded: $${typeof balance === 'number' ? balance.toFixed(2) : Number(balance).toFixed(2)}`
  })),

);