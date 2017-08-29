import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { CoreModule } from '../core/core.module';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    TableModule,
    RouterModule.forChild([
      { path: ':id', component: ApplicationComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class ApplicationModule { }
