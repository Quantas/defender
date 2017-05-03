import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: 'builds.component.html',
    styleUrls: [ 'builds.component.less' ]
})
export class BuildsComponent implements OnInit {

    builds: Observable<any>;

    constructor(private http: Http) {
    }

    ngOnInit(): void {
        this.builds = this.http.get('/api/builds').map((res) => res.json());
    }

}
