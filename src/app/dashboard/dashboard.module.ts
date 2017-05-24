import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DashboardModule { }
