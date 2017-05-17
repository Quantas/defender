import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Page, Sort } from './page';
import { Column } from './column';
import { PageChangeEvent } from './page.change.event';
import { CurrentSort, SortType } from './sort.type';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: [ 'table.component.less' ]
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  data: Page | Observable<Page | any[]> | any[];

  @Input()
  columns: Column[];

  @Input()
  linkTarget: string;

  @Input()
  linkKey: string;

  @Input()
  sortable = true;

  @Input()
  serverSide = true;

  @Output()
  change = new EventEmitter<PageChangeEvent>();

  dataSubscription: Subscription;

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

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
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
            case SortType.NONE:
            default: {
              // -> ASC
              column.sortType = SortType.ASC;
              break;
            }
          }
        }
      });

      const sorts = this.generateSortArray();

      // sort internally
      if (!this.serverSide) {
        this.page.content.sort((a, b) => {
          let result = 0;

          sorts.forEach((sort: CurrentSort) => {
            if ( result === 0 ) {
              const aVal = this.findValue(a, sort.property);
              const bVal = this.findValue(b, sort.property);

              result = (aVal < bVal) ? -1 : (aVal > bVal) ? 1 : 0;

              result *= (sort.sortType === SortType.DESC) ? -1 : 1;
            }
          });

          return result;
        });
      }

      this.change.emit({
        pageNo: this.page.number,
        sortString: this.generateSortString(),
        sorts: sorts
      });
    }
  }

  retrieveCell(row, column: Column): string {
      row = this.findValue(row, column.property);

      if (column.pipe) {
        return column.pipe.transform(row, column.pipeArgs);
      }

      return row;
  }

  rowClick(row): void {
    if (this.linkTarget && this.linkKey) {

      this.router.navigate([this.linkTarget, this.findValue(row, this.linkKey)]);
    }
  }

  private findValue(input: Object, key: string): any {
    const arr = key.split('.');
    while (arr.length && (input = input[arr.shift()])) {};
    return input;
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
        this.setupPageArray();
      } else if (this.data.constructor === Observable) {
        this.setupPageSubscription();
      } else {
        this.page = this.data as Page;
      }

      this.setupInitialSort();
    }
  }

  private setupPageArray(): void {
    this.page = {content: this.data as any[]};
  }

  private setupPageSubscription(): void {
    this.dataSubscription = (this.data as Observable<Page | any[]>).subscribe((data: Page | any[]) => {
      if (this.data.constructor === Array) {
        this.page = {content: data as any[]};
      } else {
        this.page = data as Page;
      }
    });
  }

  private setupInitialSort() {
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
