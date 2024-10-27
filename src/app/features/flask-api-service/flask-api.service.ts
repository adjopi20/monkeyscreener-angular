import { HttpClient, HttpParams } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, delay, map, multicast, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlaskApiService {
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getStockList(
    listingBoard?: string,
    sector?: string,
    industry?: string,
    recommendation?: string,
    minMarketCap?: number,
    maxMarketCap?: number,
    minPrice?: number,
    maxPrice?: number,
    minDividendRate?: number,
    maxDividendRate?: number,
    sortBy?: string,
    order?: string
  ): Observable<any> {
    let params = new HttpParams();

    if (listingBoard) {
      params = params.set('listingBoard', listingBoard);
    }
    if (sector) {
      params = params.set('sector', sector);
    }
    if (industry) {
      params = params.set('industry', industry);
    }
    if (recommendation) {
      params = params.set('recommendation', recommendation);
    }
    if (minMarketCap) {
      params = params.set('minMarketCap', minMarketCap);
    }
    if (maxMarketCap) {
      params = params.set('maxMarketCap', maxMarketCap);
    }
    if (minPrice) {
      params = params.set('minPrice', minPrice);
    }
    if (maxPrice) {
      params = params.set('maxPrice', maxPrice);
    }
    if (minDividendRate) {
      params = params.set('minDividendRate', minDividendRate);
    }
    if (maxDividendRate) {
      params = params.set('maxDividendRate', maxDividendRate);
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (order) {
      params = params.set('order', order);
    }

    return this.http.get(`${this.url}/info/stocklist`, {
      params: params,
    });
  }

  getFilterOptions(): Observable<any> {
    return this.http.get(`${this.url}/filter-options`);
  }

  getHistogramItems(
    sector: string,
    metric: string,
    listingBoard?: string,
    industry?: string
  ): Observable<any> {
    let params = new HttpParams();

    if (listingBoard) {
      params = params.set('listingBoard', listingBoard);
    }
    if (industry) {
      params = params.set('industry', industry);
    }
    return this.http.get(
      `${this.url}/histogram-analysis-for-sector-2/${sector}/${metric}`,
      { params: params }
    );
  }
  //=========================================================================================
  getQIncomeStatement(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/financials/q-inc-stmt/` + symbol);
  }
  getIncomeStatement(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/financials/inc-stmt/${symbol}`);
  }

  getQBalSheet(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/financials/q-balance-sheet/${symbol}`);
  }

  getBalSheet(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/financials/balance-sheet/${symbol}`);
  }

  getQCashFlow(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/financials/q-cash-flow/${symbol}`);
  }

  getCashFlow(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/financials/cash-flow/${symbol}`);
  }
  //=========================================================================================

  getNews(): Observable<any> {
    return this.http.get(`${this.url}/news`);
  }

  getHistoricalPrice(
    period: string
    // start?: string,
    // end?: string
  ): Observable<any> {
    return this.http.get(`${this.url}/history-metadata/${period}`);
  }

  getStockHistoricalData(symbol: string, period: string): Observable<any> {
    return this.http.get(`${this.url}/history-metadata/${symbol}/${period}`);
  }

  getStockInfo(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/info2/${symbol}`);
  }

  //=========================================================================================
  getStockAction(symbol: string): Observable<any> {
    return this.http.get(`${this.url}/actions/${symbol}`);
  }

  //=========================================================================================
  getTopGainer(period: string): Observable<any> {
    return this.http.get(`${this.url}/top-gainer/${period}`);
  }

  //=========================================================================================
  getRiskReward(symbol: string, period: string): Observable<any> {
    return this.http.get(`${this.url}/risk-reward/${symbol}/${period}`);
  }
}
