import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'dependencies.component.html',
  styleUrls: [ 'dependencies.component.less' ]
})
export class DependenciesComponent implements OnInit {

  dependencies: Observable<any>;

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.dependencies = this.http.get('/api/dependencies').map((res) => res.json());
  }

}
