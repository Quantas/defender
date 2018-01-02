import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BuildComponent } from './build.component';
import { CoreModule } from '../core/core.module';
import {SharkTableModule} from "shark-ng-table";

@NgModule({
    declarations: [
        BuildComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharkTableModule,
        RouterModule.forChild([
            { path: ':id', component: BuildComponent, pathMatch: 'full'}
        ])
    ],
    exports: [ RouterModule ]
})
export class BuildModule { }
