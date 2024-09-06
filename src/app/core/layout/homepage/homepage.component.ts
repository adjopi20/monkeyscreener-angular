import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { StockInfoComponent } from '../../../features/components/stock-info/stock-info/stock-info.component';
import { FooterComponent } from '../footer/footer.component';
import { DashboardCanvasComponent } from '../dashboard-canvas/dashboard-canvas.component';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HistogramAnalysisComponent } from '../../../features/components/histogram-analysis/histogram-analysis.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewComponent } from "../../../features/components/overview/overview.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    StockInfoComponent,
    FooterComponent,
    DashboardCanvasComponent,
    NgIf,
    NgClass,
    HistogramAnalysisComponent,
    NgFor,
    NgStyle,
    OverviewComponent
],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  feature: string = 'overview';
  

  constructor() {}

  ngOnInit(): void {
    console.log('dc feature', this.feature);
  }

  ngOnChanges() {
  }

  
  
}
