import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BuildComponent } from './build.component';
import { CoreModule } from '../core/core.module';
import { TableModule } from '../table/table.module';

@NgModule({
    declarations: [
        BuildComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        TableModule,
        RouterModule.forChild([
            { path: ':id', component: BuildComponent, pathMatch: 'full'}
        ])
    ],
    exports: [ RouterModule ]
})
export class BuildModule { }
