import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BuildsComponent } from './builds.component';
import {CoreModule} from '../core/core.module';
import { TableModule } from '../table/table.module';

@NgModule({
    declarations: [
        BuildsComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        TableModule,
        RouterModule.forChild([
          { path: '', component: BuildsComponent, pathMatch: 'full'},
          { path: ':id', component: BuildsComponent, pathMatch: 'full'}
        ])
    ],
    exports: [ RouterModule ]
})
export class BuildsModule { }
