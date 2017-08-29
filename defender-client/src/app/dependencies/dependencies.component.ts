import { Component, Type } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Column } from '../table/column';
import { TitleCasePipe } from '../core/titlecase.pipe';
import { PageableComponent } from '../pageable.component';
import { StatusComponent } from '../core/status.component';

@Component({
  templateUrl: 'dependencies.component.html',
  styleUrls: [ 'dependencies.component.less' ]
})
export class DependenciesComponent extends PageableComponent {

  depsTableColumns: Column[] = [
    { header: 'Status', property: 'dependencyStatus.status', alignRight: true, component: StatusComponent },
    { header: 'Group ID', property: 'groupId', alignRight: true },
    { header: 'Artifact ID', property: 'artifactId', alignRight: true },
    { header: 'Version', property: 'version', alignRight: true },
    { header: 'Type', property: 'type', alignRight: true, pipe: TitleCasePipe }
  ];

  constructor(http: Http, route: ActivatedRoute, router: Router) {
    super(http, route, router, '/api/dependencies/page/', '/deps', 'groupId;artifactId;version');
  }

}
