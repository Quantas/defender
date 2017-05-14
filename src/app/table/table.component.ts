import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Page, Sort } from './page';
import { Column } from './column';
import { PageChangeEvent } from './page.change.event';
import { CurrentSort, SortType } from './sort.type';

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

  @Input()
  sortable = true;

  @Output()
  change = new EventEmitter<PageChangeEvent>();

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
    this.change.emit({
      pageNo: pageNo,
      sortString: this.generateSortString(),
      sorts: this.generateSortArray()
    });
  }

  changeSort(columnProperty: string, sortType: SortType): void {
    if (this.sortable) {
      this.columns.forEach((column: Column) => {

        if (column.property === columnProperty) {
          // State Machine
          // ASC -> DESC -> NONE -> ASC
          switch (sortType) {
            case SortType.ASC: {
              // -> DESC
              column.sortType = SortType.DESC;
              break;
            }
            case SortType.DESC: {
              // -> NONE
              column.sortType = SortType.NONE;
              break;
            }
            case SortType.NONE: {
              // -> ASC
              column.sortType = SortType.ASC;
              break;
            }
            default: {
              column.sortType = SortType.ASC;
              break;
            }
          }
        }
      });

      this.change.emit({
        pageNo: this.page.number,
        sortString: this.generateSortString(),
        sorts: this.generateSortArray()
      });
    }
  }

  retrieveCell(row, column: Column): string {
      const arr = column.property.split('.');
      while (arr.length && (row = row[arr.shift()])) {}

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

  private generateSortString(): string {
    let sortString = '';

    this.columns.forEach((column: Column) => {
      switch (column.sortType) {
        case SortType.ASC: {
          sortString += '' + column.property + ';';
          break;
        }
        case SortType.DESC: {
          sortString += '-' + column.property + ';';
          break;
        }
        case SortType.NONE: {
          break;
        }
      }
    });

    return sortString;
  }

  private generateSortArray(): CurrentSort[] {
    const currentSorts: CurrentSort[] = [];

    this.columns.forEach((column: Column) => {
      switch (column.sortType) {
        case SortType.ASC:
        case SortType.DESC: {
          currentSorts.push({property: column.property, sortType: column.sortType});
          break;
        }
      }
    });

    return currentSorts;
  }

  private updatePage(): void {
    if (this.data) {
      if (this.data.constructor === Array) {
        this.page = {content: this.data as any[]};
      } else {
        this.page = this.data as Page;
      }

      if (this.page.sort && this.page.sort.length > 0) {
        this.columns.forEach((column: Column) => {

          this.page.sort.forEach((sort: Sort) => {
            if (column.property === sort.property) {
              column.sortType = SortType.NONE;

              if (sort.ascending) {
                column.sortType = SortType.ASC;
              } else if (sort.descending) {
                column.sortType = SortType.DESC;
              }
            }
          });
        });
      }
    }
  }
}
