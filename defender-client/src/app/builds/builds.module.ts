import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BuildsComponent } from './builds.component';
import {CoreModule} from '../core/core.module';
import {SharkTableModule} from "shark-ng-table";

@NgModule({
    declarations: [
        BuildsComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharkTableModule,
        RouterModule.forChild([
          { path: '', component: BuildsComponent, pathMatch: 'full'},
          { path: ':id', component: BuildsComponent, pathMatch: 'full'}
        ])
    ],
    exports: [ RouterModule ]
})
export class BuildsModule { }
