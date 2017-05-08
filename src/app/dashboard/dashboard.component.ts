import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.less' ]
})
export class DashboardComponent implements OnInit {

  constructor(private http: Http) {
  }

  ngOnInit(): void {
  }
}
