import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleCasePipe } from '../core/titlecase.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PageableComponent } from '../pageable.component';
import { SharkColumn } from 'shark-ng-table';
import { App } from '../model/app';

@Component({
  template: `
    <h2>Apps</h2>

    <shark-table
      (pageChange)="getPage($event)"
      [linkTarget]="'/app'"
      [linkKey]="'id'"
      [data]="page"
      [filter]="filter"
      [filterable]="true"
      [localFilter]="false"
      [localPagingSize]="'20'"
      [serverSideData]="true"
      [caption]="'Applications Table'"
      [hideCaption]="true"
      [columns]="appsTableColumn" >
    </shark-table>
  `
})
export class AppsComponent extends PageableComponent<App> {

  appsTableColumn: SharkColumn[] = [
    { header: 'Group ID', property: 'groupId', alignRight: true },
    { header: 'Artifact ID', property: 'artifactId', alignRight: true },
    { header: 'Type', property: 'type', alignRight: true, pipe: TitleCasePipe }
  ];

  constructor(http: HttpClient, route: ActivatedRoute, router: Router) {
    super(http, route, router, '/api/apps/page/', '/apps', 'groupId;artifactId');
  }
}
