import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.less' ]
})
export class DashboardComponent implements OnInit {

  depCount = 0;
  buildCount = 0;
  appCount = 0;

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.http.get('/api/dependencies/count').map((res) => res.json()).subscribe((count) => {
      this.depCount = count;
    });

    this.http.get('/api/builds/count').map((res) => res.json()).subscribe((count) => {
      this.buildCount = count;
    });

    this.http.get('/api/apps/count').map((res) => res.json()).subscribe((count) => {
      this.appCount = count;
    });
  }
}
