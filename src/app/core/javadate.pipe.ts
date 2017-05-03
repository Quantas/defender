import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'javadate'})
export class JavaDatePipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (!value) {
      return value;
    }
    return this.pad(value.monthValue) + '/' + this.pad(value.dayOfMonth) + '/'
      + value.year + ' ' + this.pad(value.hour) + ':' + this.pad(value.minute) + ':' + this.pad(value.second) + value.offset.id;
  }

  private pad(num: string): string {
    const s = '00' + num;
    return s.substr(s.length - 2);
  }
}
