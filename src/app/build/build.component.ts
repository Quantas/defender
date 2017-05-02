import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: 'build.component.html',
    styleUrls: [ 'build.component.less' ]
})
export class BuildComponent implements OnInit {

    build;

    constructor(private http: Http, private route: ActivatedRoute) {
    }

    ngOnInit() : void {
        this.route.params.switchMap((params: Params) => {
            return this.http.get('/api/builds/' + params.id).map((res) => res.json());
        }).subscribe((build) => this.build = build);
    }

}
