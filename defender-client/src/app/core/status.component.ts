import { Component, Input } from '@angular/core';
import {SharkTableCellContents} from "shark-ng-table/src/table.cell.contents";

@Component({
  selector: 'app-dep-status',
  templateUrl: 'status.component.html',
  styleUrls: [ 'status.component.less' ]
})
export class StatusComponent implements SharkTableCellContents {

  @Input()
  data: any;

}
