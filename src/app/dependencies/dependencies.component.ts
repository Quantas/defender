import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'dependencies.component.html',
  styleUrls: [ 'dependencies.component.less' ]
})
export class DependenciesComponent implements OnInit {

  page;
  pageCount;

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.getPage(0);
  }

  getPage(pageNo): void {
    this.http.get('/api/dependencies/page/' + pageNo).map((res) => res.json()).subscribe((page) => {
      this.page = page;
      this.pageCount = Array.from(Array(page.totalPages), (x, i) => i);
    });
  }

}
