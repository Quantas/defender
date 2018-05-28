import { Component, Input } from '@angular/core';
import { SharkDynamicContents } from 'shark-ng-table';

@Component({
  selector: 'app-dep-status',
  template: `<span *ngIf="data" class="status" [ngClass]="data">{{ data }}</span>`,
  styleUrls: [ 'status.component.less' ]
})
export class StatusComponent implements SharkDynamicContents {

  @Input()
  data: any;

  childOpen(value): void {
  }

}
