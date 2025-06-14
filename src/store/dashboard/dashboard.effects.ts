import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TradingApiService } from '../../trading-api.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { dashboardActions } from './dashboard.actions';
import { of } from 'rxjs';
import { InteractiveBrokersApiService } from '../../services/interactive-brokers-api.service';

@Injectable()
export class DashboardEffects {
    
        
    private actions$ = inject(Actions);
    private tradingApiIB = inject(InteractiveBrokersApiService);


    loadHelloIBKR$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dashboardActions.loadHelloIBKR),
            mergeMap(() =>
                this.tradingApiIB.getHelloIBKR().pipe(
                    map(response => dashboardActions.loadHelloIBKRSuccess({ data: response })),
                    catchError(error => of(dashboardActions.loadHelloIBKRFailure({ error: error.message })))
                )
            )
        )
    );


    loadHistoricalStock$ = createEffect(() =>
        this.actions$.pipe(
        ofType(dashboardActions.loadHistoricalStock),
        mergeMap(action =>
            this.tradingApiIB.getHistoricalStock(action.symbol).pipe(
            map(data => dashboardActions.loadHistoricalStockSuccess({ data })),
            catchError(error => of(dashboardActions.loadHistoricalStockFailure({ error })))
            )
        )
        )
    );

    loadAccountBalance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dashboardActions.loadAccountBalance),
            mergeMap(() =>
                this.tradingApiIB.getAccountBalance().pipe(
                    map(response => dashboardActions.loadAccountBalanceSuccess({ balance: response.balance })),
                    catchError(error => of(dashboardActions.loadAccountBalanceFailure({ error: error.message })))
                )
            )
        )
    );

    loadHistoricalStockCustom$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dashboardActions.loadHistoricalStockCustom),
            mergeMap(action =>
                this.tradingApiIB.getHistoricalStockCustom(
                    action.symbol,
                    action.end_date || '',
                    action.duration_str || '1 M',
                    action.bar_size_setting || '1 day',
                    action.what_to_show || 'TRADES'
                ).pipe(
                    map(data => dashboardActions.loadHistoricalStockCustomSuccess({ data })),
                    catchError(error => of(dashboardActions.loadHistoricalStockCustomFailure({ error })))
                )
            )
        )
    );

}