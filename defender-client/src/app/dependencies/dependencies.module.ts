import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependenciesComponent } from './dependencies.component';
import { CoreModule } from '../core/core.module';
import { SharkTableModule } from 'shark-ng-table';

@NgModule({
  declarations: [
    DependenciesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharkTableModule,
    RouterModule.forChild([
      { path: '', component: DependenciesComponent, pathMatch: 'full'},
      { path: ':id', component: DependenciesComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependenciesModule { }
