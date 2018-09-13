import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule}   from '@angular/forms';

import {TranslationModule} from '../translate.module';

import {UpdateUserComponent} from './updateUser.component';
import {UserMenuComponent} from './userMenu.component';
import {ProfileComponent} from './profile.component';
import {LoginRegisterComponent} from './loginRegister.component';

import {ProxyService} from '../../services/proxy.service';
import {UserService} from '../../services/user/user.service';
import {UserDataProvider} from '../../services/userDataProvider.service';
import {AlertService} from '../../services/alert.service';

const userRoutes: Routes = [
{
	path: 'user',
	children: [
	{
		path: 'edit/:id',
		component: UpdateUserComponent
	},
	{
		path: 'edit',
		component: UpdateUserComponent
	},
	{
		path: 'menu',
		component: UserMenuComponent
	},
	{
		path: ':id',
		component: ProfileComponent
	},
	]
},
{
	path: 'login',
	component: LoginRegisterComponent
}
];

@NgModule({
	imports: [
	CommonModule, RouterModule.forRoot(userRoutes), TranslationModule, FormsModule
	],
	declarations: [
	UpdateUserComponent, UserMenuComponent, ProfileComponent, LoginRegisterComponent
	],
	exports: [
	UpdateUserComponent, UserMenuComponent, ProfileComponent, LoginRegisterComponent
	],
	providers: [
	ProxyService, UserService, UserDataProvider, AlertService
	]
})
export class UserModule { }
