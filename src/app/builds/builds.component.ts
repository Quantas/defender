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
      { header: 'Group ID', property: 'app.groupId' },
      { header: 'Artifact ID', property: 'app.artifactId' },
      { header: 'Version', property: 'version' },
      { header: 'Build Time', property: 'buildTime', pipe: new JavaDatePipe() },
    ];

    constructor(http: Http, route: ActivatedRoute, router: Router) {
      super(http, route, router, '/api/builds/page/', '/builds', '-buildTime');
    }
}
