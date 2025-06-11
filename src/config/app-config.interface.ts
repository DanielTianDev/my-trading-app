import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  ibApiUrl: string;
  fastApiUrl: string;
  timeout: number;
  retryAttempts: number;
}

export interface TradingConfig {
  maxRiskPerTrade: number;
  defaultSymbols: string[];
  paperTrading: boolean;
  defaultAccountId: string;
}

export interface FeatureConfig {
  enableMockData: boolean;
  enableLogging: boolean;
  enableRealTimeData: boolean;
}

export interface AppConfig {
  production: boolean;
  api: ApiConfig;
  trading: TradingConfig;
  features: FeatureConfig;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
