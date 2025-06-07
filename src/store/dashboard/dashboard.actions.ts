import { createAction, props } from '@ngrx/store';

export const dashboardActions = {


  loadHelloIBKR: createAction('[Dashboard] Load Hello IBKR'),
  loadHelloIBKRSuccess: createAction('[Dashboard] Load Hello IBKR Success', props<{ data: any }>()),
  loadHelloIBKRFailure: createAction('[Dashboard] Load Hello IBKR Failure', props<{ error: string }>()),

  // IB Gateway Status Actions
  checkIBStatus: createAction('[Dashboard] Check IB Status'),
  checkIBStatusSuccess: createAction(
    '[Dashboard] Check IB Status Success',
    props<{ status: any }>()
  ),
  checkIBStatusFailure: createAction(
    '[Dashboard] Check IB Status Failure',
    props<{ error: any }>()
  ),

  loadHistoricalStock: createAction('[Dashboard] Load Historical Stock',  
    props<{ symbol: string }>()
  ),

  loadHistoricalStockSuccess: createAction(
    '[Dashboard] Load Historical Stock Success',
    props<{ data: any[] }>()
  ),
  loadHistoricalStockFailure: createAction(
    '[Dashboard] Load Historical Stock Failure',
    props<{ error: any }>()
  ),

  // Test Actions for IB Gateway
  testGetMSFTPrice: createAction('[Dashboard] Test Get MSFT Price'),
  testGetMSFTPriceSuccess: createAction(
    '[Dashboard] Test Get MSFT Price Success',
    props<{ data: any }>()
  ),
  testGetMSFTPriceFailure: createAction(
    '[Dashboard] Test Get MSFT Price Failure',
    props<{ error: any }>()
  ),

  testGetAccounts: createAction('[Dashboard] Test Get Accounts'),
  testGetAccountsSuccess: createAction(
    '[Dashboard] Test Get Accounts Success',
    props<{ accounts: any }>()
  ),
  testGetAccountsFailure: createAction(
    '[Dashboard] Test Get Accounts Failure',
    props<{ error: any }>()
  ),

  testSearchContractsSuccess: createAction(
    '[Dashboard] Test Search Contracts Success',
    props<{ contracts: any }>()
  ),
  testSearchContractsFailure: createAction(
    '[Dashboard] Test Search Contracts Failure',
    props<{ error: any }>()
  ),
};