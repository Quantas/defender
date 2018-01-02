import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { TitleCasePipe } from '../core/titlecase.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PageableComponent } from '../pageable.component';
import {SharkColumn} from "shark-ng-table";

@Component({
  templateUrl: 'apps.component.html',
  styleUrls: [ 'apps.component.less' ]
})
export class AppsComponent extends PageableComponent {

  appsTableColumn: SharkColumn[] = [
    { header: 'Group ID', property: 'groupId', alignRight: true },
    { header: 'Artifact ID', property: 'artifactId', alignRight: true },
    { header: 'Type', property: 'type', alignRight: true, pipe: TitleCasePipe }
  ];

  constructor(http: Http, route: ActivatedRoute, router: Router) {
    super(http, route, router, '/api/apps/page/', '/apps', 'groupId;artifactId');
  }
}
