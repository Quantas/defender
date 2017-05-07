import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependenciesComponent } from './dependencies.component';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [
    DependenciesComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild([
      { path: '', component: DependenciesComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependenciesModule { }
