import { ChangeDetectorRef, Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FlaskApiService } from '../../flask-api-service/flask-api.service';

@Component({
  selector: 'app-risk-reward',
  standalone: true,
  imports: [],
  templateUrl: './risk-reward.component.html',
  styleUrl: './risk-reward.component.scss'
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
  selectedSymbol: string[] = [];
  currentSymbol: string = '';
  rawData: any[] = [];

  constructor(
    private apiService: FlaskApiService,
    private cdr: ChangeDetectorRef,
    
  ) {}
  ngOnInit() {  }

  async getStockList() {
    try {

      
      const data = await firstValueFrom(this.apiService.getStockList());
      this.rawData = data.data;

      const filter = await firstValueFrom(this.apiService.getFilterOptions());
      this.sectorList = filter.sector.filter( (item: any) => item !== 'Unknown');
      this.listingBoardList = filter.listingBoard;
      this.currentSector = this.sectorList[0];

      for (let item of data.data) {
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
          this.currentIndustry === item['industry'] &&
          (this.currentListingBoard === undefined || this.currentListingBoard === item['listing_board'])
        )
          this.symbolList.push(item['symbol']);
      }
      
      if (this.symbolList.length > 0) {
        this.currentSymbol = this.symbolList[0];
        this.selectedSymbol.push(this.currentSymbol);
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      console.log('complete');
    }
  }
}
