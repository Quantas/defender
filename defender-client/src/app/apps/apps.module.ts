import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppsComponent } from './apps.component';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [
    AppsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild([
      { path: '', component: AppsComponent, pathMatch: 'full'},
      { path: ':id', component: AppsComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class AppsModule { }
