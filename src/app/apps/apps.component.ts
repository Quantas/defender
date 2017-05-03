import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'apps.component.html',
  styleUrls: [ 'apps.component.less' ]
})
export class AppsComponent implements OnInit {

  apps: Observable<any>;

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.apps = this.http.get('/api/apps').map((res) => res.json());
  }

}
