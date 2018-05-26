import { of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharkPageChangeEvent, Page } from 'shark-ng-table';
import { HttpClient } from '@angular/common/http';

export abstract class PageableComponent implements OnInit {

  public page: Page;
  public filter: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,
    private endpointUrl: string, private routerUrl: string, private defaultSort?: string) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (this.page) {
        this.filter = params['filter'];
        this.retrieveData(this.page.number, params['sort'], params['filter']);
      }
    });

    this.route.params.pipe(switchMap((params: Params) => {
      let id;
      if (params['id']) {
        id = params['id'] - 1;
      } else {
        id = 0;
      }
      return observableOf(id);
    })).subscribe((id) => {
      const routeSort = this.route.snapshot.queryParams['sort'];
      const routeFilter = this.route.snapshot.queryParams['filter'];

      this.filter = routeFilter;

      this.retrieveData(id, routeSort ? routeSort : this.defaultSort, routeFilter);
    });
  }

  public getPage(pageChangeEvent: SharkPageChangeEvent): void {
    this.router.navigate(
      [this.routerUrl, pageChangeEvent.pageNo + 1],
      {
        queryParams: {
          sort: pageChangeEvent.sortString,
          filter: pageChangeEvent.filter
        }
      }
    ).then((result: boolean) => {
      if (!result) {
        // no navigation state change, redo retrieve
        this.retrieveData(
          this.route.snapshot.params['id'] - 1,
          this.route.snapshot.queryParams['sort'],
          this.route.snapshot.queryParams['filter']
        );
      }
    });
  }

  private retrieveData(id: number, sort: string, filter: string): void {
    let sortString = '';

    if (sort) {
      sortString = '?sort=' + sort;

      if (filter) {
        sortString += '&filter=' + filter;
      }
    } else if (filter) {
      sortString = '?filter=' + filter;
    }

    this.http.get(this.endpointUrl + id + sortString).subscribe((page: Page) => this.page = page);
  }

}
