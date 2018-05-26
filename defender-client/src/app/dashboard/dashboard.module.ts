import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CoreModule } from '../core/core.module';
import {SharkTableModule} from "shark-ng-table";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharkTableModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DashboardModule { }
