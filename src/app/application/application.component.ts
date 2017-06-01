import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { JavaDatePipe } from '../core/javadate.pipe';
import { Column } from '../table/column';
import { PageChangeEvent } from '../table/page.change.event';
import { Page } from '../table/page';
import { StatusComponent } from '../core/status.component';
import { PassedFailedPipe } from '../core/passedfailed.pipe';

@Component({
  templateUrl: 'application.component.html',
  styleUrls: [ 'application.component.less' ]
})
export class ApplicationComponent implements OnInit {

  app;

  buildsObservable: Observable<Page>;
  private buildsSubject: BehaviorSubject<Page>;

  buildsTableColumns: Column[] = [
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: JavaDatePipe },
    { header: 'Passed', property: 'passed', pipe: PassedFailedPipe, component: StatusComponent }
  ];

  constructor(private http: Http, private route: ActivatedRoute) {
    this.buildsSubject = new BehaviorSubject({});
    this.buildsObservable = this.buildsSubject.asObservable();
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/apps/' + params.id).map((res) => res.json());
    }).subscribe((app) => {
      this.app = app;
      this.updateSubject({pageNo: 0});
    });
  }

  updateSubject(pageChangeEvent: PageChangeEvent): void {
    this.http.get('/api/apps/' + this.app.id + '/builds/' + pageChangeEvent.pageNo).map((res) => res.json()).subscribe((buildPage) => {
      this.buildsSubject.next(buildPage);
    });
  }

}
