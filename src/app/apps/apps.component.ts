import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Column } from '../table/column';
import { TitleCasePipe } from '../core/titlecase.pipe';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
      this.http.get('/api/apps/page/' + id).map((res) => res.json()).subscribe((page) => {
        this.appPage = page;
      });
    });
  }

  getPage(pageNo): void {
    this.router.navigate(['/deps', pageNo + 1]);
  }

}
