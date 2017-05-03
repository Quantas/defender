import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BuildsComponent } from './builds.component';
import {CoreModule} from '../core/core.module';

@NgModule({
    declarations: [
        BuildsComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild([
            { path: '', component: BuildsComponent, pathMatch: 'full'}
        ])
    ],
    exports: [ RouterModule ]
})
export class BuildsModule { }
