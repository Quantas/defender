import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Page } from '../table/page';
import { Column } from '../table/column';
import { JavaDatePipe } from '../core/javadate.pipe';

@Component({
    templateUrl: 'builds.component.html',
    styleUrls: [ 'builds.component.less' ]
})
export class BuildsComponent implements OnInit {

    page: Page;

    buildsTableColumns: Column[] = [
      { header: 'Group ID', property: 'app.groupId' },
      { header: 'Artifact ID', property: 'app.artifactId' },
      { header: 'Version', property: 'version' },
      { header: 'Build Time', property: 'buildTime', pipe: new JavaDatePipe() },
    ];

    constructor(private http: Http) {
    }

    ngOnInit(): void {
        this.getPage(0);
    }

    getPage(pageNo): void {
      this.http.get('/api/builds/page/' + pageNo).map((res) => res.json()).subscribe((page) => {
        this.page = page;
      });
    }
}
