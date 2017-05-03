import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependencyComponent } from './dependency.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    DependencyComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: ':id', component: DependencyComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependencyModule { }
