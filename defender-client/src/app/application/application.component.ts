import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { JavaDatePipe } from '../core/javadate.pipe';
import { StatusComponent } from '../core/status.component';
import { PassedFailedPipe } from '../core/passedfailed.pipe';
import { SharkColumn, SharkPageChangeEvent, Page } from 'shark-ng-table';

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
      (pageChange)="updateSubject($event)"
      [linkTarget]="'/build'"
      [linkKey]="'id'"
      [data]="buildsObservable"
      [columns]="buildsTableColumns"
      [sortable]="false">
    </shark-table>

    <button (click)="updateSubject({pageNo: 0, columns: []})">Update</button>
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

  app;

  buildsObservable: Observable<Page>;
  private buildsSubject: BehaviorSubject<Page>;

  buildsTableColumns: SharkColumn[] = [
    { header: 'Version', property: 'version' },
    { header: 'Build Time', property: 'buildTime', pipe: JavaDatePipe },
    { header: 'Passed', property: 'passed', pipe: PassedFailedPipe, component: StatusComponent }
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.buildsSubject = new BehaviorSubject({});
    this.buildsObservable = this.buildsSubject.asObservable();
  }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.http.get('/api/apps/' + params.id);
    })).subscribe((app) => {
      this.app = app;
      this.updateSubject({pageNo: 0, columns: []});
    });
  }

  updateSubject(pageChangeEvent: SharkPageChangeEvent): void {
    this.http.get('/api/apps/' + this.app.id + '/builds/' + pageChangeEvent.pageNo).subscribe((buildPage: Page) => {
      this.buildsSubject.next(buildPage);
    });
  }

}
