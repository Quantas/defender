import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { JavaDatePipe } from '../core/javadate.pipe';
import { StatusComponent } from '../core/status.component';
import { SharkColumn, SharkPageChangeEvent } from 'shark-ng-table';

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

  buildsTableColumns: SharkColumn[] = [
    { header: 'Group ID', property: 'app.groupId' },
    { header: 'Artifact ID', property: 'app.artifactId' },
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: JavaDatePipe }
  ];

  historyTableColumns: SharkColumn[] = [
    { header: 'User', property: 'userID' },
    { header: 'Time', property: 'time', pipe: JavaDatePipe },
    { header: 'Old Value', property: 'oldValue.status', component: StatusComponent },
    { header: 'New Value', property: 'newValue.status', component: StatusComponent }
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/dependencies/' + params.id);
    }).subscribe((dep: any) => {
      this.newStatus = this.pickStatus(dep.dependencyStatus.status);
      this.dep = dep;
      this.getBuildsPage({pageNo: 0, columns: []});
    });
  }

  updateStatus(): void {
    this.http.post('/api/dependencies/' + this.dep.id + '/' + this.newStatus.status, {}).subscribe((dep) => {
      if (dep) {
        this.dep = dep;
      }
    });
  }

  getBuildsPage(pageChangeEvent: SharkPageChangeEvent): void {
    this.http.get('/api/dependencies/' + this.dep.id + '/builds/' + pageChangeEvent.pageNo)
      .subscribe((buildPage) => {
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
