import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

import { StatusComponent } from '../core/status.component';
import { SharkColumn } from 'shark-ng-table';
import { Build } from '../model/build';

@Component({
    template: `
      <h2>Build</h2>
      <table *ngIf="build">
        <tr><th>ID</th><td>{{ build.id }}</td></tr>
        <tr><th>Group Id</th><td>{{ build.app.groupId }}</td></tr>
        <tr><th>Artifact Id</th><td><a [routerLink]="['/app', build.app.id]">{{ build.app.artifactId }}</a></td></tr>
        <tr><th>Version</th><td>{{ build.version }}</td></tr>
        <tr><th>Build Time</th><td>{{ build.buildTime | javadate }}</td></tr>
        <tr><th>User</th><td>{{ build.userName }}</td></tr>
        <tr><th>Status</th><td><app-dep-status [data]="build.passed | passedfailed"></app-dep-status></td></tr>
      </table>

      <h3>Dependencies</h3>
      <shark-table
        *ngIf="build"
        [data]="build.buildDependencies"
        [localFilter]="true"
        [caption]="'Dependencies Table'"
        [hideCaption]="true"
        [columns]="depsTableColumns"
        [linkKey]="'dependency.id'"
        [linkTarget]="'/dep'"
        [initialSort]="'dependency.groupId;dependency.artifactId'">
      </shark-table>
    `,
    styles: [
      `
        table {
          min-width: 20rem;
        }
      `
    ]
})
export class BuildComponent implements OnInit {

  build: Build;

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
            return this.http.get<Build>('/api/builds/' + params.id);
        })).subscribe((build) => this.build = build);
    }
}
