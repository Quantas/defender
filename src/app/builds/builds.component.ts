import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Page } from '../table/page';
import { Column } from '../table/column';
import { JavaDatePipe } from '../core/javadate.pipe';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageChangeEvent } from '../table/page.change.event';
import { PageableComponent } from '../pageable.component';

@Component({
    templateUrl: 'builds.component.html',
    styleUrls: [ 'builds.component.less' ]
})
export class BuildsComponent extends PageableComponent {

    buildsTableColumns: Column[] = [
      { header: 'Group ID', property: 'app.groupId', alignRight: true },
      { header: 'Artifact ID', property: 'app.artifactId', alignRight: true },
      { header: 'Version', property: 'version', alignRight: true },
      { header: 'Build Time', property: 'buildTime', alignRight: true, pipe: JavaDatePipe }
    ];

    constructor(http: Http, route: ActivatedRoute, router: Router) {
      super(http, route, router, '/api/builds/page/', '/builds', '-buildTime');
    }
}
