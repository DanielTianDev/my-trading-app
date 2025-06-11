export const environment = {
  production: false,
  api: {
    ibApiUrl: 'https://localhost:5000/v1/api', // Interactive Brokers Client Portal API
    fastApiUrl: 'http://127.0.0.1:8000', // Your Python FastAPI backend
    timeout: 30000, // Request timeout in milliseconds
    retryAttempts: 3
  },
  trading: {
    maxRiskPerTrade: 0.02, // 2% max risk per trade
    defaultSymbols: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'],
    paperTrading: true, // Enable paper trading by default in development
    defaultAccountId: 'DU123456' // Paper trading account ID
  },
  features: {
    enableMockData: true, // Use mock data when real API fails
    enableLogging: true,
    enableRealTimeData: false // Disable real-time data in development
  }
};
