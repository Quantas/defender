import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

import { StatusComponent } from '../core/status.component';
import { SharkColumn } from 'shark-ng-table';

@Component({
    templateUrl: 'build.component.html',
    styleUrls: [ 'build.component.less' ]
})
export class BuildComponent implements OnInit {

  build;

  depsTableColumns: SharkColumn[] = [
    { header: 'Group ID', property: 'dependency.groupId' },
    { header: 'Artifact ID', property: 'dependency.artifactId' },
    { header: 'Version', property: 'dependency.version' },
    { header: 'Status', property: 'dependencyStatus.status', component: StatusComponent },
    { header: 'Transitive', property: 'transitive' }
  ];

    constructor(private http: HttpClient, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.pipe(switchMap((params: Params) => {
            return this.http.get('/api/builds/' + params.id);
        })).subscribe((build) => this.build = build);
    }
}
