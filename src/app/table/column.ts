import { PipeTransform } from '@angular/core';
import { SortType } from './sort.type';

export interface Column {
  header: string;
  property: string;
  pipe?: PipeTransform;
  pipeArgs?: any[];
  sortType?: SortType;
  alignRight?: boolean;
}
