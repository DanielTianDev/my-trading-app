export const environment = {
  production: true,
  api: {
    ibApiUrl: 'https://your-production-ib-gateway.com/v1/api', // Production IB Gateway
    fastApiUrl: 'https://your-production-api.com', // Production FastAPI backend
    timeout: 45000, // Longer timeout for production
    retryAttempts: 5
  },
  trading: {
    maxRiskPerTrade: 0.015, // 1.5% max risk per trade in production
    defaultSymbols: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'],
    paperTrading: false, // Use real trading in production
    defaultAccountId: 'U123456' // Real trading account ID
  },
  features: {
    enableMockData: false, // No mock data in production
    enableLogging: false, // Disable verbose logging in production
    enableRealTimeData: true // Enable real-time data in production
  }
};
