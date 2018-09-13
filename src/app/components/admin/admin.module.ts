import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {TranslationModule} from '../translate.module';

const adminRoutes: Routes = [
  {
    path: 'admin',
    children: [
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(adminRoutes), TranslationModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AdminModule {}
