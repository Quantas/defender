import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { JavaDatePipe } from '../core/javadate.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PageableComponent } from '../pageable.component';
import { SharkColumn } from 'shark-ng-table';

@Component({
    templateUrl: 'builds.component.html',
    styleUrls: [ 'builds.component.less' ]
})
export class BuildsComponent extends PageableComponent {

    buildsTableColumns: SharkColumn[] = [
      { header: 'Group ID', property: 'app.groupId', alignRight: true },
      { header: 'Artifact ID', property: 'app.artifactId', alignRight: true },
      { header: 'Version', property: 'version', alignRight: true },
      { header: 'Build Time', property: 'buildTime', alignRight: true, pipe: JavaDatePipe }
    ];

    constructor(http: HttpClient, route: ActivatedRoute, router: Router) {
      super(http, route, router, '/api/builds/page/', '/builds', '-buildTime');
    }
}
