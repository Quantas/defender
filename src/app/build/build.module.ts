import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BuildComponent } from './build.component';

@NgModule({
    declarations: [
        BuildComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: ':id', component: BuildComponent, pathMatch: 'full'}
        ])
    ],
    exports: [ RouterModule ]
})
export class BuildModule { }
