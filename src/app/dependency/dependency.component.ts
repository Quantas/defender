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

@Component({
  templateUrl: 'dependency.component.html',
  styleUrls: [ 'dependency.component.less' ]
})
export class DependencyComponent implements OnInit {

  title;
  dep;
  buildPage;

  buildsTableColumns: Column[] = [
    { header: 'Group ID', property: 'app.groupId' },
    { header: 'Artifact ID', property: 'app.artifactId' },
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: new JavaDatePipe() },
  ];

  historyTableColumns: Column[] = [
    { header: 'User', property: 'user' },
    { header: 'Time', property: 'time', pipe: new JavaDatePipe() },
    { header: 'Old Value', property: 'oldValue', pipe: new TitleCasePipe() },
    { header: 'New Value', property: 'newValue', pipe: new TitleCasePipe() }
  ];

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/dependencies/' + params.id).map((res) => res.json());
    }).subscribe((dep) => {
      this.dep = dep;
      this.title = (dep.groupId ? dep.groupId + '   ' : '') + dep.artifactId;
      this.getBuildsPage({pageNo: 0});
    });
  }

  updateStatus(depId): void {
    this.http.post('/api/dependencies/' + depId + '/' + 'APPROVED', {}).map((res) => res.json()).subscribe((dep) => {
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

}
