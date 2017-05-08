import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Page } from '../table/page';
import { Column } from '../table/column';
import { JavaDatePipe } from '../core/javadate.pipe';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
      this.route.params.switchMap((params: Params) => {
        let id;
        if (params['id']) {
          id = params['id'] - 1;
        } else {
          id = 0;
        }
        return Observable.of(id);
      }).subscribe((id) => {
        this.http.get('/api/builds/page/' + id).map((res) => res.json()).subscribe((page) => {
          this.page = page;
        });
      });
    }

    getPage(pageNo): void {
      this.router.navigate(['/builds', pageNo + 1]);
    }
}
