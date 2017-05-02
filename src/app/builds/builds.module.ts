import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BuildsComponent } from './builds.component';

@NgModule({
    declarations: [
        BuildsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: BuildsComponent, pathMatch: 'full'}
        ])
    ],
    exports: [ RouterModule ]
})
export class BuildsModule { }
