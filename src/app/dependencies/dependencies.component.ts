import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Column } from '../table/column';
import { TitleCasePipe } from '../core/titlecase.pipe';


@Component({
  templateUrl: 'dependencies.component.html',
  styleUrls: [ 'dependencies.component.less' ]
})
export class DependenciesComponent implements OnInit {

  page;

  depsTableColumns: Column[] = [
    { header: 'Status', property: 'dependencyStatus', pipe: new TitleCasePipe() },
    { header: 'Group ID', property: 'groupId' },
    { header: 'Artifact ID', property: 'artifactId' },
    { header: 'Version', property: 'version' },
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
      this.http.get('/api/dependencies/page/' + id).map((res) => res.json()).subscribe((page) => {
        this.page = page;
      });
    });
  }

  getPage(pageNo): void {
    this.router.navigate(['/deps', pageNo + 1]);
  }

}
