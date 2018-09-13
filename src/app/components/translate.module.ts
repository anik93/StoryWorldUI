import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Http} from '@angular/http';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'src/app/translations', '.json'),
      deps: [Http]
    })
  ],
  exports: [
    TranslateModule
  ]
})
export class TranslationModule {}
