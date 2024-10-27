import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  feature: string = 'overview';
  items: any[] = [
    '../../../../assets/download',
    '../../../../assets/TES1.png',
    '../../../../assets/TES3.png',
    '../../../../assets/TES6.png',
    '../../../../assets/TES5.png',
  ];
  colors: any[] = [
    'has-background-danger-dark',
    'has-background-warning-dark',
    'has-background-info-dark',
    'has-background-dark',
    'has-background-black',
  ];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startPresentation();
  }
  onTabChange(feature: string) {
    this.feature = feature;
    // Update URL without reloading the page
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { feature: this.feature },
    //   queryParamsHandling: 'merge', // Merge with existing query params
    // });
  }
  startPresentation(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
