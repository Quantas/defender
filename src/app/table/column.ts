import { PipeTransform } from '@angular/core';

export interface Column {
  header: string;
  property: string;
  pipe?: PipeTransform;
  pipeArgs?: any[];
}
