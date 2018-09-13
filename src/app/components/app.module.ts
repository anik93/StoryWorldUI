import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {TranslationModule} from './translate.module';

import {AdminModule} from './admin/admin.module';
import {StoryModule} from './story/story.module';
import {UserModule} from './user/user.module';
import {UsualModule} from './usual/usual.module';

import {AppComponent} from './app.component';
import {AlertComponent} from './alert/alert.component';

import {AlertService} from '../services/alert.service';
import {UserDataProvider} from '../services/userDataProvider.service';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';

const appRoutes: Routes = [
];

@NgModule({
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), TranslationModule,
    StoryModule, UserModule, AdminModule, UsualModule, MultiselectDropdownModule
  ],
  declarations: [
    AppComponent, AlertComponent
  ],
  bootstrap: [AppComponent],
  providers: [AlertService, UserDataProvider]
})
export class AppModule {}
