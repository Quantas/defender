import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: 'application.component.html',
  styleUrls: [ 'application.component.less' ]
})
export class ApplicationComponent implements OnInit {

  app;
  builds;

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => {
      return this.http.get('/api/apps/' + params.id).map((res) => res.json());
    }).subscribe((app) => {
      this.app = app;
      this.http.get('/api/apps/' + app.id + '/builds').map((res) => res.json()).subscribe((builds) => {
        this.builds = builds;
      });
    });
  }

}
