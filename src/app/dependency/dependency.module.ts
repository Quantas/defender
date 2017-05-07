import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependencyComponent } from './dependency.component';
import { CoreModule } from '../core/core.module';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [
    DependencyComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    TableModule,
    RouterModule.forChild([
      { path: ':id', component: DependencyComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependencyModule { }
