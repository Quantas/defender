import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependenciesComponent } from './dependencies.component';
import { TableModule } from '../table/table.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    DependenciesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    TableModule,
    RouterModule.forChild([
      { path: '', component: DependenciesComponent, pathMatch: 'full'},
      { path: ':id', component: DependenciesComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependenciesModule { }
