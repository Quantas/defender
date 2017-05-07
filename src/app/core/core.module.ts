import { NgModule } from '@angular/core';

import { JavaDatePipe } from './javadate.pipe';
import { TitleCasePipe } from './titlecase.pipe';

@NgModule({
  exports: [
    JavaDatePipe,
    TitleCasePipe
  ],
  declarations: [
    JavaDatePipe,
    TitleCasePipe
  ]
})
export class CoreModule {}
