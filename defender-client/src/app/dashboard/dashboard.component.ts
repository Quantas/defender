import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JavaDatePipe } from '../core/javadate.pipe';
import { StatusComponent } from '../core/status.component';
import { PassedFailedPipe } from '../core/passedfailed.pipe';
import { SharkColumn, SharkPageChangeEvent, Page } from 'shark-ng-table';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.less' ]
})
export class DashboardComponent implements OnInit {

  stats: Stat[];

  recentBuilds: Page;

  buildsTableColumns: SharkColumn[] = [
    { header: 'Group ID', property: 'app.groupId', alignRight: true },
    { header: 'Artifact ID', property: 'app.artifactId', alignRight: true },
    { header: 'Version', property: 'version', alignRight: true },
    { header: 'Build Time', property: 'buildTime', alignRight: true, pipe: JavaDatePipe },
    { header: 'Status', property: 'passed', alignRight: true, pipe: PassedFailedPipe, component: StatusComponent }
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.refreshRecentBuilds(undefined);
  }

  refreshRecentBuilds(pageChangeEvent: SharkPageChangeEvent): void {
    this.http.get<Stat[]>('/api/dashboard/stats').subscribe(stats => {
      this.stats = stats;
    });

    this.http.get('/api/builds/recent').subscribe((page: Page) => {
      this.recentBuilds = page;
    });
  }
}

export class Stat {
  name: string;
  count: string;
}
