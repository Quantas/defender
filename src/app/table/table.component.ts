import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from './page';
import { Column } from './column';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: [ 'table.component.less' ]
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  data: Page | any[];

  @Input()
  columns: Column[];

  @Input()
  linkTarget: string;

  @Input()
  linkKey: string;

  @Output()
  change = new EventEmitter<number>();

  page: Page;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updatePage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['data'];
    if (change && !change.isFirstChange()) {
      this.updatePage();
    }
  }

  changePage(pageNo): void {
    this.change.emit(pageNo);
  }

  retrieveCell(row, column: Column): string {
      const arr = column.property.split('.');
      while (arr.length && (row = row[arr.shift()])) {};

      if (column.pipe) {
        return column.pipe.transform(row, column.pipeArgs);
      }

      return row;
  }

  rowClick(row): void {
    if (this.linkTarget && this.linkKey) {
      const arr = this.linkKey.split('.');
      while (arr.length && (row = row[arr.shift()])) {};

      this.router.navigate([this.linkTarget, row]);
    }
  }

  private updatePage(): void {
    if (this.data) {
      if (this.data.constructor === Array) {
        this.page = {content: this.data as any[]};
      } else {
        this.page = this.data;
      }
    }
  }
}
