import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'passedfailed'})
export class PassedFailedPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (value) {
      return 'Passed';
    }

    if (!value) {
      return 'Failed';
    }
  }
}
