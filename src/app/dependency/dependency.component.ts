import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Column } from '../table/column';
import { JavaDatePipe } from '../core/javadate.pipe';
import { TitleCasePipe } from '../core/titlecase.pipe';
import { PageChangeEvent } from '../table/page.change.event';
import { StatusComponent } from '../core/status.component';
import { PassedFailedPipe } from '../core/passedfailed.pipe';

export interface DependencyStatus {
  status: string;
  display: string;
}

@Component({
  templateUrl: 'dependency.component.html',
  styleUrls: [ 'dependency.component.less' ]
})
export class DependencyComponent implements OnInit {
  dep;
  buildPage;

  newStatus: DependencyStatus;

  statuses: DependencyStatus[] = [
    {display: 'New', status: 'new'},
    {display: 'Approved', status: 'approved'},
    {display: 'Insecure', status: 'insecure'},
    {display: 'Deprecated', status: 'deprecated'},
    {display: 'Banned', status: 'banned'}
  ];

  buildsTableColumns: Column[] = [
    { header: 'Group ID', property: 'app.groupId' },
    { header: 'Artifact ID', property: 'app.artifactId' },
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: JavaDatePipe }
  ];

  historyTableColumns: Column[] = [
    { header: 'User', property: 'userID' },
    { header: 'Time', property: 'time', pipe: JavaDatePipe },
    { header: 'Old Value', property: 'oldValue.status', component: StatusComponent },
    { header: 'New Value', property: 'newValue.status', component: StatusComponent }
  ];

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/dependencies/' + params.id).map((res) => res.json());
    }).subscribe((dep) => {
      this.newStatus = this.pickStatus(dep.dependencyStatus.status);
      this.dep = dep;
      this.getBuildsPage({pageNo: 0});
    });
  }

  updateStatus(): void {
    this.http.post('/api/dependencies/' + this.dep.id + '/' + this.newStatus.status, {}).map((res) => res.json()).subscribe((dep) => {
      if (dep) {
        this.dep = dep;
      }
    });
  }

  getBuildsPage(pageChangeEvent: PageChangeEvent): void {
    this.http.get('/api/dependencies/' + this.dep.id + '/builds/' + pageChangeEvent.pageNo)
      .map((res) => res.json()).subscribe((buildPage) => {
        this.buildPage = buildPage;
    });
  }

  private pickStatus(status: string): DependencyStatus {
    let foundStatus = undefined;
    this.statuses.forEach((newStatus) => {
      if (newStatus.status.toLowerCase() === status.toLowerCase()) {
        foundStatus = newStatus;
      }
    });
    return foundStatus;
  }

}
