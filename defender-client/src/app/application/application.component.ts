import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { JavaDatePipe } from '../core/javadate.pipe';
import { StatusComponent } from '../core/status.component';
import { PassedFailedPipe } from '../core/passedfailed.pipe';
import { SharkColumn, SharkPageChangeEvent, Page } from 'shark-ng-table';

@Component({
  templateUrl: 'application.component.html',
  styleUrls: [ 'application.component.less' ]
})
export class ApplicationComponent implements OnInit {

  app;

  buildsObservable: Observable<Page>;
  private buildsSubject: BehaviorSubject<Page>;

  buildsTableColumns: SharkColumn[] = [
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: JavaDatePipe },
    { header: 'Passed', property: 'passed', pipe: PassedFailedPipe, component: StatusComponent }
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.buildsSubject = new BehaviorSubject({});
    this.buildsObservable = this.buildsSubject.asObservable();
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/apps/' + params.id);
    }).subscribe((app) => {
      this.app = app;
      this.updateSubject({pageNo: 0, columns: []});
    });
  }

  updateSubject(pageChangeEvent: SharkPageChangeEvent): void {
    this.http.get('/api/apps/' + this.app.id + '/builds/' + pageChangeEvent.pageNo).subscribe((buildPage) => {
      this.buildsSubject.next(buildPage);
    });
  }

}
