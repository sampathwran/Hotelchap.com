export const exchangeRates: Record<string, number> = {
  USD: 1,
  LKR: 300,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.53,
  CAD: 1.36,
  SGD: 1.35,
  INR: 83.5,
  AED: 3.67,
  JPY: 154,
  CNY: 7.24,
  THB: 36.8,
  MYR: 4.78,
  PHP: 57.5,
  IDR: 16200,
  KRW: 1375,
  VND: 25400,
  ZAR: 18.9,
  NZD: 1.68,
  BRL: 5.15,
  MXN: 16.7,
  SAR: 3.75,
  TRY: 32.5,
  RUB: 92.5
};

export function convertCurrency(amount: number, from: string, to: string): number {
  const fromRate = exchangeRates[from] || 1;
  const toRate = exchangeRates[to] || 1;
  
  // Convert to USD first, then to target currency
  const inUSD = amount / fromRate;
  return Math.round(inUSD * toRate);
}
