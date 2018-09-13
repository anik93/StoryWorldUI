import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs/Observable';

import {User} from '../classes/user/user.class';
import {ProxyResponse} from '../classes/response.class';
import {UserService} from './user/user.service';


@Injectable()
export class UserDataProvider {
  private loggedIn: Boolean;
  private logged = new Subject<Boolean>();
  private token: string;
  private user: User;
  private showLeftPanel: Boolean;
  private mobile: Boolean;

  constructor(private userService: UserService) {
    if (JSON.parse(Cookie.get('loggedIn'))) {
      this.loggedIn = JSON.parse(Cookie.get('loggedIn'));
      this.user = JSON.parse(Cookie.get('user'));
      this.token = JSON.parse(Cookie.get('token'));
      this.logged.next(true);
      this.showLeftPanel = true;
    } else {
      this.loggedIn = false;
      this.logged.next(false);
      this.showLeftPanel = false;
    }

    this.mobile = false;
    if (window.screen.height < 700 && window.screen.width < 800) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  public getToken(): string {
    return this.token;
  }

  public setLoggedIn(logged: Boolean) {
    this.loggedIn = logged;
    this.logged.next(logged);
  }

  public isLoggedIn(): Boolean {
    return this.loggedIn;
  }

  public isLogged(): Observable<Boolean> {
    return this.logged.asObservable();
  }

  public setShowLeftPanel(show: Boolean) {
    this.showLeftPanel = show;
  }

  public showHideLeftPanel() {
    this.showLeftPanel = !this.showLeftPanel;
  }

  public isShowLeftPanel(): Boolean {
    return this.showLeftPanel;
  }

  public isMobile(): Boolean {
    return this.mobile;
  }

  public logIn(res: ProxyResponse<User>) {
    Cookie.set('loggedIn', JSON.stringify(true));
    Cookie.set('user', JSON.stringify(res.getT()));
    Cookie.set('token', JSON.stringify(res.getT().token));
    this.token = res.getT().token;
    this.user = res.getT();
    this.setLoggedIn(true);
  }

  public logOut() {
    this.userService.logOut(this.token);
    Cookie.deleteAll();
    this.user = null;
    this.token = null;
    this.logged.next(false);
    this.setLoggedIn(false);
  }

  public calculateFavouritePlacesOnWidth() {
    return window.screen.width / 12;
  }

  public calculateFavouritePlacesOffWidth() {
    if (!this.mobile) {
      return (window.screen.width / 12) / 12;
    } else {
      return (window.screen.width / 12) / 3;
    }
  }

  public getUser(): User {
    return this.user;
  }

  public hasRole(id: number): Boolean {
    return this.user != null && this.user.roles.filter(x => x.id === id).length > 0 ? true : false;
  }

}
