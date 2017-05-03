import { NgModule } from '@angular/core';

import { JavaDatePipe } from './javadate.pipe';

@NgModule({
  exports: [
    JavaDatePipe
  ],
  declarations: [
    JavaDatePipe
  ]
})
export class CoreModule {}
