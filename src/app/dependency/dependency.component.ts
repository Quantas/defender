import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: 'dependency.component.html',
  styleUrls: [ 'dependency.component.less' ]
})
export class DependencyComponent implements OnInit {

  dep;
  builds;

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/dependencies/' + params.id).map((res) => res.json());
    }).subscribe((dep) => {
      this.dep = dep;
      this.http.get('/api/dependencies/' + dep.id + '/builds').map((res) => res.json()).subscribe((builds) => {
        this.builds = builds;
      });
    });
  }

  updateStatus(depId): void {
    this.http.post('/api/dependencies/' + depId + '/' + 'APPROVED', {}).map((res) => res.json()).subscribe((dep) => {
      if (dep) {
        this.dep = dep;
      }
    });
  }

}
