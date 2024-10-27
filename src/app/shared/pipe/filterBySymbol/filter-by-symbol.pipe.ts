import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySymbol',
  standalone: true,
})
export class FilterBySymbolPipe implements PipeTransform {
  transform(rawData: any[], selectedSymbols: string[]): any[] {
    if (!rawData || !selectedSymbols || selectedSymbols.length === 0) {
      return rawData;
    }
    const filtered = rawData.filter((item) => selectedSymbols.includes(item.symbol));
    console.log('Filtered Data:', filtered);
    return filtered;
  }
}
