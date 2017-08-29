import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'javadate'})
export class JavaDatePipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (!value) {
      return value;
    }
    const theDate = new Date(value);

    return theDate.toLocaleDateString() + ' ' + theDate.toLocaleTimeString();
  }

  private pad(num: string): string {
    const s = '00' + num;
    return s.substr(s.length - 2);
  }
}
