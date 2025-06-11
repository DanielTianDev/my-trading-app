import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TradingDashboardComponent } from '../components/trading-dashboard/trading-dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trade', component: TradingDashboardComponent }
];
