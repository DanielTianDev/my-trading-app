import { createReducer, on } from '@ngrx/store';
import { dashboardActions } from './dashboard.actions';


export const FORM_ID = 'TRADING_DASHBOARD_FORM';
export const TRADING_DASHBOARD_FORM_NAME = 'Trading Dashboard Form';

export interface TradingDashboardFormState {
  customDuration: string;
  customBarSize: string;
  customEndDate: string;
  customWhatToShow: string;
}

export interface State {
  message: string;
  tslaPrice?: string;
  data?: any; 
  error?: any; 
  dataLength?: number; 
  accountBalance?: number; 
  customChartData?: any[] | null; // For custom chart data
  chartForm: TradingDashboardFormState;
}

export const initialState: State = {
  message: 'hello world',
  tslaPrice: '0.00',
  data: null,
  error: null,
  dataLength: 0 ,
  accountBalance: 0, 
  customChartData: null,
  chartForm: {
    customDuration: '1 M',
    customBarSize: '1 Day',
    customEndDate: '',
    customWhatToShow: 'TRADES'
  }
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

  on(dashboardActions.loadHistoricalStockCustom, (state, { symbol }) => ({
    ...state,
    message: `Loading custom historical data for ${symbol}...`
  })),

  on(dashboardActions.loadHistoricalStockCustomSuccess, (state, { data }) => {
    let message = 'Custom historical data loaded.';
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];
      const last = data[data.length - 1];
      message = `Loaded ${data.length} bars: ${first.date} to ${last.date}`;
    }
    return {
      ...state,
      customChartData: data,
      message,
    };
  }),

  on(dashboardActions.loadHistoricalStockCustomFailure, (state, { error }) => ({
    ...state,
    error: `Error loading custom historical data: ${error}`
  })),

);