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
    { header: 'Group ID', property: 'groupId' },
    { header: 'Artifact ID', property: 'artifactId' },
    { header: 'Type', property: 'type', pipe: new TitleCasePipe() }
  ];

  constructor(http: Http, route: ActivatedRoute, router: Router) {
    super(http, route, router, '/api/apps/page/', '/apps');
  }
}
