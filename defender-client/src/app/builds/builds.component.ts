import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { JavaDatePipe } from '../core/javadate.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PageableComponent } from '../pageable.component';
import { SharkColumn } from 'shark-ng-table';
import { Build } from '../model/build';

@Component({
    template: `
      <h2>Builds</h2>

      <shark-table
        (pageChange)="getPage($event)"
        [linkTarget]="'/build'"
        [linkKey]="'id'"
        [data]="page"
        [filter]="filter"
        [localPagingSize]="'20'"
        [serverSideData]="true"
        [columns]="buildsTableColumns" >
      </shark-table>
    `
})
export class BuildsComponent extends PageableComponent<Build> {

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
