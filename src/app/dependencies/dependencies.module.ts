import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependenciesComponent } from './dependencies.component';

@NgModule({
  declarations: [
    DependenciesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DependenciesComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependenciesModule { }
