import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TradingDashboardComponent } from '../components/trading-dashboard/trading-dashboard-new.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TradingDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'my ai trading app';
}
