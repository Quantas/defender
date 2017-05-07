import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import { Column } from '../table/column';

@Component({
  templateUrl: 'dependencies.component.html',
  styleUrls: [ 'dependencies.component.less' ]
})
export class DependenciesComponent implements OnInit {

  page;

  depsTableColumns: Column[] = [
    { header: 'Status', property: 'dependencyStatus' },
    { header: 'Group ID', property: 'groupId' },
    { header: 'Artifact ID', property: 'artifactId' },
    { header: 'Version', property: 'version' }
  ];

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.getPage(0);
  }

  getPage(pageNo): void {
    this.http.get('/api/dependencies/page/' + pageNo).map((res) => res.json()).subscribe((page) => {
      this.page = page;
    });
  }

}
