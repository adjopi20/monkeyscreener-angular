import { ChangeDetectorRef, Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FlaskApiService } from '../../flask-api-service/flask-api.service';
import { DropdownComponent } from '../../../shared/component/dropdown/dropdown.component';
import { RadioComponent } from '../../../shared/component/radio/radio.component';
import { CheckboxesComponent } from '../../../shared/component/checkboxes/checkboxes.component';
import { DecimalPipe, NgFor, PercentPipe } from '@angular/common';
import { FilterBySymbolPipe } from '../../../shared/pipe/filterBySymbol/filter-by-symbol.pipe';

@Component({
  selector: 'app-risk-reward',
  standalone: true,
  imports: [
    DropdownComponent,
    RadioComponent,
    CheckboxesComponent,
    NgFor,
    DecimalPipe,
    PercentPipe,
    FilterBySymbolPipe,
  ],
  templateUrl: './risk-reward.component.html',
  styleUrl: './risk-reward.component.scss',
})
export class RiskRewardComponent {
  sectorList: string[] = [];
  listingBoardList: string[] = [];
  currentSector: string = '';
  industryList: string[] = [];
  currentIndustry: string = '';
  dataInASector: any[] = [];
  currentListingBoard?: string | undefined;

  symbolList: string[] = [];
  selectedSymbols: string[] = [];
  currentSymbol: string = '';

  rawData: any[] = [];
  filteredData: any[] = [];

  riskRewardData: any[] = [];

  constructor(
    private apiService: FlaskApiService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.getStockList();
  }

  async getStockList() {
    try {
      const data = await firstValueFrom(this.apiService.getStockList());
      this.rawData = data.data;

      const filter = await firstValueFrom(this.apiService.getFilterOptions());
      this.sectorList = filter.sector.filter((item: any) => item !== 'Unknown');
      this.listingBoardList = filter.listingBoard;
      this.currentSector = this.sectorList[0];

      for (let item of data.data) {
        if (this.currentSector === item['sector']) {
          this.dataInASector.push(item);
        }
      }
      console.log('datain a sector', this.dataInASector);

      this.industryList = [
        ...new Set(this.dataInASector.map((item: any) => item['industry'])),
      ];
      this.currentIndustry = this.industryList[0];

      for (let item of this.dataInASector) {
        if (
          this.currentSector === item['sector'] &&
          this.currentIndustry === item['industry'] &&
          (this.currentListingBoard === undefined ||
            this.currentListingBoard === item['listing_board'])
        )
          this.symbolList.push(item['symbol']);
      }

      if (this.symbolList.length > 0) {
        this.currentSymbol = this.symbolList[0];
        this.selectedSymbols.push(this.currentSymbol);
      }
      // console.log("selected symbol",this.selectedSymbols);
      this.filterData(); 

      this.getRiskReward();
    } catch (error) {
      console.error(error);
    } finally {
      console.log('complete');
    }
  }

  async getRiskReward() {
    try {
      this.riskRewardData = [];

      for (let item of this.selectedSymbols) {
        const data = await firstValueFrom(
          this.apiService.getRiskReward(item, '5y')
        );

        if (!this.riskRewardData.some((entry) => entry.symbol === item)) {
          this.riskRewardData.push(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  sectorChanged() {
    this.dataInASector = [];
    this.industryList = [];
    this.symbolList = [];

    for (let item of this.rawData) {
      if (this.currentSector === item['sector']) {
        this.dataInASector.push(item);
      }
    }
    this.industryList = [
      ...new Set(this.dataInASector.map((item: any) => item['industry'])),
    ];
    this.currentIndustry = this.industryList[0];

    for (let item of this.dataInASector) {
      if (
        this.currentSector === item['sector'] &&
        this.currentIndustry === item['industry']
      )
        this.symbolList.push(item['symbol']);
    }
    this.selectedSymbols = [];
    this.selectedSymbols.push(this.symbolList[0]);
  }

  receiveSetSector(event: string) {
    this.currentSector = event;
    this.symbolList = [];
    this.sectorChanged();
  }

  industryChanged() {
    this.symbolList = [];
    for (let item of this.dataInASector) {
      if (
        this.currentSector === item['sector'] &&
        this.currentIndustry === item['industry']
      )
        this.symbolList.push(item['symbol']);
    }
    this.selectedSymbols = [];
    this.selectedSymbols.push(this.symbolList[0]);
  }

  receiveSetIndustry(event: string) {
    this.currentIndustry = event;
    this.industryChanged();
  }

  receiveSetListingBoard(event: string) {
    this.currentListingBoard = event;
  }

  receiveSetSymbol(event: string) {
    this.filterData();
    this.selectedSymbols.push(event);
    this.getRiskReward();
    // this.getStockList();
    console.log('selectedSymbol: ', this.selectedSymbols);
  }

  // Filter the data manually
  filterData() {
    if (!this.selectedSymbols || this.selectedSymbols.length === 0) {
      this.filteredData = this.rawData; 
    } else {
      this.filteredData = this.rawData.filter((item) =>
        this.selectedSymbols.includes(item.symbol)
      );
    }
    console.log('Filtered Data:', this.filteredData);
  }
}
