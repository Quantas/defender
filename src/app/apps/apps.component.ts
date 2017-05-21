import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Column } from '../table/column';
import { TitleCasePipe } from '../core/titlecase.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PageableComponent } from '../pageable.component';

@Component({
  templateUrl: 'apps.component.html',
  styleUrls: [ 'apps.component.less' ]
})
export class AppsComponent extends PageableComponent {

  appsTableColumn: Column[] = [
    { header: 'Group ID', property: 'groupId', alignRight: true },
    { header: 'Artifact ID', property: 'artifactId', alignRight: true },
    { header: 'Type', property: 'type', alignRight: true, pipe: new TitleCasePipe() }
  ];

  constructor(http: Http, route: ActivatedRoute, router: Router) {
    super(http, route, router, '/api/apps/page/', '/apps', 'groupId;artifactId');
  }
}
