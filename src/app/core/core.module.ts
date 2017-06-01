import { NgModule } from '@angular/core';

import { JavaDatePipe } from './javadate.pipe';
import { TitleCasePipe } from './titlecase.pipe';
import { StatusComponent } from './status.component';
import { CommonModule } from '@angular/common';
import { PassedFailedPipe } from './passedfailed.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    JavaDatePipe,
    TitleCasePipe,
    PassedFailedPipe,
    StatusComponent
  ],
  entryComponents: [
    StatusComponent
  ],
  declarations: [
    JavaDatePipe,
    TitleCasePipe,
    PassedFailedPipe,
    StatusComponent
  ]
})
export class CoreModule {}
