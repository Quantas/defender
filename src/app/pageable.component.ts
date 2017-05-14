import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Page } from './table/page';
import { Observable } from 'rxjs/Rx';
import { PageChangeEvent } from './table/page.change.event';

export abstract class PageableComponent implements OnInit {

  public page: Page;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router,
    private endpointUrl: string, private routerUrl: string, private defaultSort?: string) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (this.page) {
        this.retrieveData(this.page.number, params['sort']);
      }
    });

    this.route.params.switchMap((params: Params) => {
      let id;
      if (params['id']) {
        id = params['id'] - 1;
      } else {
        id = 0;
      }
      return Observable.of(id);
    }).subscribe((id) => {
      const routeSort = this.route.snapshot.queryParams['sort']
      this.retrieveData(id, routeSort ? routeSort : this.defaultSort);
    });
  }

  public getPage(pageChangeEvent: PageChangeEvent): void {
    this.router.navigate([this.routerUrl, pageChangeEvent.pageNo + 1], {queryParams: {sort: pageChangeEvent.sortString} });
  }

  private retrieveData(id: number, sort: string): void {
    let sortString = '';

    if (sort) {
      sortString = '?sort=' + sort;
    }

    this.http.get(this.endpointUrl + id + sortString)
      .map((res) => res.json()).subscribe((page: Page) => {
      this.page = page;
    });
  }

}
