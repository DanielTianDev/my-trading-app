import { http, HttpResponse } from 'msw'
 

export const handlers = [
  http.get('https://www.alphavantage.co/query', () => {
    return HttpResponse.json({
      "Global Quote": {
        "01. symbol": "TSLA",
        "02. open": "6669.5000",
        "03. high": "348.0200",
        "04. low": "333.3300",
        "05. price": "342.6900",
        "06. volume": "81873829",
        "07. latest trading day": "2025-06-02",
        "08. previous close": "346.4600",
        "09. change": "-3.7700",
        "10. change percent": "-1.0881%"
      }
    });
  }),
];