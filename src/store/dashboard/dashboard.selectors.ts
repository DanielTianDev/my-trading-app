import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<State>('dashboard');

export const selectDashboardMessage = createSelector(
  selectDashboardState,
  (state) => state.message
);

export const selectData = createSelector(
  selectDashboardState,
  (state) => state.data
);

export const selectTSLAPrice = createSelector(
  selectDashboardState,
  (state) => state.tslaPrice
);

export const selectTSLAData = createSelector(
  selectDashboardState,
  (state) => state.data
);

export const selectDataLength = createSelector(
  selectDashboardState,
  (state) => state.dataLength
);

export const selectAccountBalance = createSelector(
  selectDashboardState,
  (state) => state.accountBalance
);

export const selectCustomChartData = createSelector(
  selectDashboardState,
  (state) => state.customChartData
);