import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Column } from '../table/column';
import { TitleCasePipe } from '../core/titlecase.pipe';

@Component({
  templateUrl: 'apps.component.html',
  styleUrls: [ 'apps.component.less' ]
})
export class AppsComponent implements OnInit {

  appPage;

  appsTableColumn: Column[] = [
    { header: 'Group ID', property: 'groupId' },
    { header: 'Artifact ID', property: 'artifactId' },
    { header: 'Type', property: 'type', pipe: new TitleCasePipe() }
  ];

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.getPage(0);
  }

  getPage(pageNo): void {
    this.http.get('/api/apps/page/' + pageNo).map((res) => res.json()).subscribe((page) => {
      this.appPage = page;
    });
  }

}
