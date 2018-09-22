import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

import { JavaDatePipe } from '../core/javadate.pipe';
import { StatusComponent } from '../core/status.component';
import { PassedFailedPipe } from '../core/passedfailed.pipe';
import { SharkColumn, SharkPageChangeEvent } from 'shark-ng-table';
import { App } from '../model/app';
import { DefenderPage } from '../model/defender.page';
import { Build } from '../model/build';

@Component({
  template: `
    <h2>Application</h2>

    <table *ngIf="app">
      <tr><th>Group Id</th><td>{{ app.groupId }}</td></tr>
      <tr><th>Artifact Id</th><td>{{ app.artifactId }}</td></tr>
      <tr *ngIf="app.description"><th>Description</th><td>{{ app.description }}</td></tr>
      <tr *ngIf="app.url"><th>URL</th><td>{{ app.url }}</td></tr>
      <tr *ngIf="app.license"><th>License</th><td>{{ app.license }}</td></tr>
      <tr *ngIf="app.repository"><th>Repository</th><td>{{ app.repository }}</td></tr>
    </table>

    <h3>Builds</h3>
    <shark-table
      (pageChange)="updatePage($event)"
      [linkTarget]="'/build'"
      [linkKey]="'id'"
      [data]="buildPage"
      [columns]="buildsTableColumns"
      [caption]="'Builds Table'"
      [hideCaption]="true"
      [localPaging]="false"
      [filterable]="false"
      [localFilter]="false"
      [serverSideData]="true"
      [sortable]="false">
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
export class ApplicationComponent implements OnInit {

  app: App;
  buildPage: DefenderPage<Build>;

  buildsTableColumns: SharkColumn[] = [
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: JavaDatePipe },
    { header: 'Passed', property: 'passed', pipe: PassedFailedPipe, component: StatusComponent }
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.http.get<App>('/api/apps/' + params.id);
    })).subscribe((app) => {
      this.app = app;
      this.updatePage({pageNo: 0, columns: []});
    });
  }

  updatePage(pageChangeEvent: SharkPageChangeEvent): void {
    this.http.get<DefenderPage<Build>>('/api/apps/' + this.app.id + '/builds/' + pageChangeEvent.pageNo).subscribe((buildPage: DefenderPage<Build>) => {
      this.buildPage = buildPage;
    });
  }

}
