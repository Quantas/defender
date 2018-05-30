import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { TitleCasePipe } from '../core/titlecase.pipe';
import { PageableComponent } from '../pageable.component';
import { StatusComponent } from '../core/status.component';
import { SharkColumn } from 'shark-ng-table';
import { Dependency } from '../model/dependency';

@Component({
  template: `
    <h2>Dependencies</h2>

    <shark-table
      (pageChange)="getPage($event)"
      [linkTarget]="'/dep'"
      [linkKey]="'id'"
      [data]="page"
      [filter]="filter"
      [serverSideData]="true"
      [localPagingSize]="'20'"
      [caption]="'Dependencies Table'"
      [hideCaption]="true"
      [columns]="depsTableColumns" >
    </shark-table>
  `
})
export class DependenciesComponent extends PageableComponent<Dependency> {

  depsTableColumns: SharkColumn[] = [
    { header: 'Status', property: 'dependencyStatus.status', alignRight: true, component: StatusComponent },
    { header: 'Group ID', property: 'groupId', alignRight: true },
    { header: 'Artifact ID', property: 'artifactId', alignRight: true },
    { header: 'Version', property: 'version', alignRight: true },
    { header: 'Type', property: 'type', alignRight: true, pipe: TitleCasePipe }
  ];

  constructor(http: HttpClient, route: ActivatedRoute, router: Router) {
    super(http, route, router, '/api/dependencies/page/', '/deps', 'groupId;artifactId;version');
  }

}
