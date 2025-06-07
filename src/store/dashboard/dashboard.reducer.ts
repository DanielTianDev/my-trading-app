import { createReducer, on } from '@ngrx/store';
import { dashboardActions } from './dashboard.actions';

export interface DashboardState {
  message: string;
  tslaPrice?: string;
  data?: any; // Optional, for historical data
  error?: any; // Optional, for error handling
}

export const initialState: DashboardState = {
  message: 'hello world',
  tslaPrice: '0.00',
  data: null,
  error: null
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
      message = `Loaded ${data.length} weeks: ${first.date} to ${last.date}`;
    }
    return {
      ...state,
      data,
      message
    };
  }),

  on(dashboardActions.loadHistoricalStockFailure, (state, { error }) => ({
    ...state,
    error: `Error loading historical data: ${error}`
  })),

  // on(dashboardActions.loadTSLAPriceSuccess, (state, { price }) => ({
  //   ...state,
  //   tslaPrice: price
  // })),

  // on(dashboardActions.loadTSLAPriceFailure, (state, { error }) => ({
  //   ...state,
  //   error
  // })),

  // on(dashboardActions.loadTSLAHistoricalDataSuccess, (state, { data }) => ({
  //   ...state,
  //   data
  // })),

  // on(dashboardActions.loadTSLAHistoricalDataFailure, (state, { error }) => ({
  //   ...state,
  //   error
  // })),

  // on(dashboardActions.loadTSLAPrice, state => ({
  //   ...state,
  //   error: null // Reset error on new load action
  // })),

);