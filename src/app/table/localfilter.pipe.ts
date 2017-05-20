import { Pipe, PipeTransform } from '@angular/core';
import { Column } from './column';
import { TableUtils } from './table.utils';

@Pipe({name: 'localfilter'})
export class LocalFilterPipe implements PipeTransform {

  constructor(private tableUtils: TableUtils) {}

  transform(items: any, cols: Column[], serverSide: boolean, filterText: string): any {
    if (serverSide || !filterText) {
      return items;
    }

    return items.filter((row) => {
      let found = false;

      cols.forEach((col: Column) => {
        const value: string = this.tableUtils.retrieveCell(row, col) + '';
        if (value && (value.indexOf(filterText) !== -1)) {
          found = true;
        }
      });

      return found;
    });
  }

}
