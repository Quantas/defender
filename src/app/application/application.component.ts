import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { JavaDatePipe } from '../core/javadate.pipe';
import { Column } from '../table/column';
import { PageChangeEvent } from '../table/page.change.event';

@Component({
  templateUrl: 'application.component.html',
  styleUrls: [ 'application.component.less' ]
})
export class ApplicationComponent implements OnInit {

  app;
  buildPage;

  buildsTableColumns: Column[] = [
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: new JavaDatePipe() }
  ];

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/apps/' + params.id).map((res) => res.json());
    }).subscribe((app) => {
      this.app = app;
      this.getPage({pageNo: 0});
    });
  }

  getPage(pageChangeEvent: PageChangeEvent): void {
    this.http.get('/api/apps/' + this.app.id + '/builds/' + pageChangeEvent.pageNo).map((res) => res.json()).subscribe((buildPage) => {
      this.buildPage = buildPage;
    });
  }

}
