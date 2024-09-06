import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  getLocaleFirstDayOfWeek,
  KeyValuePipe,
  NgClass,
  NgFor,
  NgIf,
  PercentPipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { NewsComponent } from '../news/news.component';
import { CarouselComponent } from '../../../shared/component/carousel/carousel.component';
import { FlaskApiService } from '../../flask-api-service/flask-api.service';
import { firstValueFrom } from 'rxjs';
import { LoadingServiceService } from '../../../shared/service/loadingService/loading-service.service';
import { LoadingIndicatorComponent } from '../../../shared/component/loading-indicator/loading-indicator.component';
import { LoadingComponent } from '../../../shared/component/loading/loading.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NewsComponent,
    CarouselComponent,
    PercentPipe,
    CurrencyPipe,
    DecimalPipe,
    LoadingIndicatorComponent,
    LoadingComponent,
    RouterLink,
    NgClass,
  ],
  providers: [DatePipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  stocks: any[] = [];
  historical: any[] = [];
  dailyGainers: any[] = [];
  dailyLosers: any[] = [];
  weeklyGainers: any[] = [];
  weeklyLosers: any[] = [];
  monthlyGainers: any[] = [];
  monthlyLosers: any[] = [];
  topDividendRate: any[] = [];
  topDividendYield: any[] = [];
  topEarnings: any[] = [];
  topMarketCaps: any[] = [];
  topVolumes: any[] = [];
  topEPS: any[] = [];
  topROE: any[] = [];
  topEarningsGrowth: any[] = [];
  latestPrice: any = {};

  allNews: any[] = [];
  mainNews: any;
  resolutions: any[] = [];
  resolution: any = {};
  relatedTickers: any[] = [];
  mainRelatedTickers: any[] = [];
  showAdditionalSection: boolean = true;
  titleSizeMain: string = 'is-5';
  subtitleSizeMain: string = 'is-5';
  titleSizeSubMain: string = 'is-6';
  subtitleSizeSubMain: string = 'is-6';

  slicedMainNews: any[] = [];
  slicedNews: any[] = [];
  slicedNewsImg: any[] = [];

  constructor(
    private apiService: FlaskApiService,
    private datePipe: DatePipe,
    private loadingService: LoadingServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.getHistoricalPrice();
    this.getTopGainer();
    this.getStocks();
    this.getNews();
  }

  async getStocks() {
    try {
      this.loadingService.loadingOn();

      const data = await firstValueFrom(this.apiService.getStockList());
      this.stocks = data.data;

      this.stocks.sort((a, b) => b.marketCap - a.marketCap);
      this.topDividendRate = this.stocks
        .filter((item) => item.dividendRate)
        .sort((a, b) => b.dividendRate - a.dividendRate)
        .slice(0, 10);
      this.topDividendYield = this.stocks
        .filter((item) => item.dividendYield)
        .sort((a, b) => b.dividendYield - a.dividendYield)
        .slice(0, 10);
      this.topMarketCaps = this.stocks
        .filter((item) => item.marketCap)
        .sort((a, b) => b.marketCap - a.marketCap)
        .slice(0, 12);
      this.topEPS = this.stocks
        .filter((item) => item.trailingEps)
        .sort((a, b) => b.trailingEps - a.trailingEps)
        .slice(0, 12);
      this.topROE = this.stocks
        .filter((item) => item.returnOnEquity)
        .sort((a, b) => b.returnOnEquity - a.returnOnEquity)
        .slice(0, 12);
      this.topEarningsGrowth = this.stocks
        .filter((item) => item.earningsGrowth)
        .sort((a, b) => b.earningsGrowth - a.earningsGrowth)
        .slice(0, 12);
    } catch (error: any) {
      console.log(error);
    } finally {
      console.log('complete');
      this.loadingService.loadingOff();
    }
  }

  async getTopGainer() {
    try {
      console.log('getHistoricalPrice1');

      const data = await firstValueFrom(this.apiService.getTopGainer('1mo'));
      // this.historical = data.data;
      console.log('historical1', this.historical.length);

      this.dailyGainers = data.dailyGainers
      this.dailyLosers = data.dailyLosers
      this.weeklyGainers = data.weeklyGainers
      this.weeklyLosers = data.weeklyLosers
      this.monthlyGainers = data.monthlyGainers
      this.monthlyLosers = data.monthlyLosers
      this.topVolumes = data.topVolumes

    } catch (error: any) {
      console.error(error);
    } finally {
      console.log('complete');
      this.loadingService.loadingOff();
    }
  }

  getNews() {
    this.apiService.getNews().subscribe({
      next: (data: any) => {
        console.log(data);
        this.allNews = data;
        this.slicedNews = this.allNews.slice(5);
        this.slicedMainNews = this.allNews.slice(1, 5);

        this.relatedTickers = data.relatedTickers;
        for (let item of this.allNews) {
          if (item['thumbnail']) {
            this.mainNews = item;
            this.resolutions = item.thumbnail.resolutions;
            this.resolution = this.resolutions[0] || {};
            this.mainRelatedTickers = item.relatedTickers;

            break;
          }
        }
      },
      error: (error) => console.error('Error news:', error),
      complete: () => console.log('complete'),
    });
  }

  getImgForItem(item: any) {
    return item.thumbnail?.resolutions || [];
  }

  selectStock(stock: any) {
    this.router.navigate(['/stock', stock.symbol]);
  }
}
