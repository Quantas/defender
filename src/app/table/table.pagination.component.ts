import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './page';

@Component({
  selector: 'app-table-pagination',
  templateUrl: 'table.pagination.component.html',
  styleUrls: [ 'table.pagination.component.less' ]
})
export class TablePaginationComponent implements OnChanges {

  pageCount: number[] = [];

  @Input()
  page: Page;

  @Output()
  change = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('page') && !changes['page'].isFirstChange()) {
      this.pageCount = Array.from(Array(this.page.totalPages), (x, i) => i);
    }
  }

  changePage(pageNo): void {
    this.change.emit(pageNo);
  }
}
