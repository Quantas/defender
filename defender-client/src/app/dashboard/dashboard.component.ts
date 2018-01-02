import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import { JavaDatePipe } from '../core/javadate.pipe';
import { StatusComponent } from '../core/status.component';
import { PassedFailedPipe } from '../core/passedfailed.pipe';
import {Page} from "shark-ng-table/src/page";
import {SharkColumn, SharkPageChangeEvent} from "shark-ng-table";

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.less' ]
})
export class DashboardComponent implements OnInit {

  depCount = 0;
  buildCount = 0;
  appCount = 0;

  recentBuilds: Page;

  buildsTableColumns: SharkColumn[] = [
    { header: 'Group ID', property: 'app.groupId', alignRight: true },
    { header: 'Artifact ID', property: 'app.artifactId', alignRight: true },
    { header: 'Version', property: 'version', alignRight: true },
    { header: 'Build Time', property: 'buildTime', alignRight: true, pipe: JavaDatePipe },
    { header: 'Status', property: 'passed', alignRight: true, pipe: PassedFailedPipe, component: StatusComponent }
  ];

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.http.get('/api/dependencies/count').map((res) => res.json()).subscribe((count) => {
      this.depCount = count;
    });

    this.http.get('/api/builds/count').map((res) => res.json()).subscribe((count) => {
      this.buildCount = count;
    });

    this.http.get('/api/apps/count').map((res) => res.json()).subscribe((count) => {
      this.appCount = count;
    });

    this.refreshRecentBuilds(undefined);
  }

  refreshRecentBuilds(pageChangeEvent: SharkPageChangeEvent): void {
    this.http.get('/api/builds/recent').map((res) => res.json()).subscribe((page: Page) => {
      this.recentBuilds = page;
    });
  }
}
