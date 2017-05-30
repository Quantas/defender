import { PipeTransform, Type } from '@angular/core';
import { SortType } from './sort.type';
import { TableCellContents } from './table.cell.contents';

export interface Column {
  header: string;
  property: string;
  pipe?: PipeTransform;
  component?: Type<TableCellContents>;
  pipeArgs?: any[];
  sortType?: SortType;
  alignRight?: boolean;
}
