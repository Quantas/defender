import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { Column } from '../table/column';
import { TitleCasePipe } from '../core/titlecase.pipe';

@Component({
    templateUrl: 'build.component.html',
    styleUrls: [ 'build.component.less' ]
})
export class BuildComponent implements OnInit {

  build;

  depsTableColumns: Column[] = [
    { header: 'Group ID', property: 'dependency.groupId' },
    { header: 'Artifact ID', property: 'dependency.artifactId' },
    { header: 'Version', property: 'dependency.version' },
    { header: 'Status', property: 'status', pipe: new TitleCasePipe() },
    { header: 'Transitive', property: 'transitive' }
  ];

    constructor(private http: Http, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => {
            return this.http.get('/api/builds/' + params.id).map((res) => res.json());
        }).subscribe((build) => this.build = build);
    }
}
