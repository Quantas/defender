import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import { Page } from '../table/page';
import { Column } from '../table/column';
import { JavaDatePipe } from '../core/javadate.pipe';
import { PageChangeEvent } from '../table/page.change.event';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.less' ]
})
export class DashboardComponent implements OnInit {

  depCount = 0;
  buildCount = 0;
  appCount = 0;

  recentBuilds: Page;

  buildsTableColumns: Column[] = [
    { header: 'Group ID', property: 'app.groupId', alignRight: true },
    { header: 'Artifact ID', property: 'app.artifactId', alignRight: true },
    { header: 'Version', property: 'version', alignRight: true },
    { header: 'Build Time', property: 'buildTime', alignRight: true, pipe: new JavaDatePipe() },
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

  refreshRecentBuilds(pageChangeEvent: PageChangeEvent): void {
    this.http.get('/api/builds/recent').map((res) => res.json()).subscribe((page: Page) => {
      this.recentBuilds = page;
    });
  }
}
