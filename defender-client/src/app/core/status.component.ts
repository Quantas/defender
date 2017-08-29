import { Component, Input } from '@angular/core';
import { TableCellContents } from '../table/table.cell.contents';

@Component({
  selector: 'app-dep-status',
  templateUrl: 'status.component.html',
  styleUrls: [ 'status.component.less' ]
})
export class StatusComponent implements TableCellContents {

  @Input()
  data: any;

}
