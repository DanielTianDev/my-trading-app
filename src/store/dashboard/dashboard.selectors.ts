import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

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