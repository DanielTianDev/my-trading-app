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
    //private tradingApi = inject(TradingApiService);
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

// loadTSLAPrice$ = createEffect(() =>
//     this.actions$.pipe(
//         ofType(dashboardActions.loadTSLAPrice),
//         mergeMap(() =>
//             this.tradingApi.getTSLAPrice().pipe(
//                 map(data => {
//                     console.log('API Response:', data); // Debug log
//                     // For Alpha Vantage API response structure
//                     const globalQuote = data['Global Quote'];
//                     const price = globalQuote ? globalQuote['05. price'] : null;
//                     return dashboardActions.loadTSLAPriceSuccess({ price: data });
//                 }),
//                 catchError(error => {
//                     console.error('Error loading TSLA price:', error);
//                     return of(dashboardActions.loadTSLAPriceFailure({ error: error.message }));
//                 })
//             )
//         )
//     )
// );

// loadTSLAHistoricalData$ = createEffect(() =>
//     this.actions$.pipe(
//         ofType(dashboardActions.loadTSLAHistoricalData),
//         mergeMap(() =>
//             this.tradingApi.getTSLAHistoricalData().pipe(
//                 map(data => {
//                     console.log('Historical API Response:', data); // Debug log
//                     return dashboardActions.loadTSLAHistoricalDataSuccess({ data });
//                 }),
//                 catchError(error => {
//                     console.error('Error loading TSLA historical data:', error);
//                     return of(dashboardActions.loadTSLAHistoricalDataFailure({ error: error.message }));
//                 })
//             )
//         )
//     )
// );


}