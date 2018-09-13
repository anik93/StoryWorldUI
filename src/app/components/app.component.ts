import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';
import {User} from '../classes/user/user.class';

import {UserDataProvider} from '../services/userDataProvider.service';

@Component({
  selector: 'storyWorld',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/styles.scss']
})

export class AppComponent {

  user: User = new User();

  constructor(private translateService: TranslateService, private userDataProvider: UserDataProvider, private router: Router) {
    if (this.userDataProvider.isLoggedIn()) {
      this.user = this.userDataProvider.getUser();
    }
    translateService.setDefaultLang('en');
    translateService.use(translateService.getBrowserLang());
  }

  public changeLang(langCode: string) {
    this.translateService.use(langCode);
  }

  public isLogin() {
    return this.userDataProvider.isLoggedIn();
  }

  public logout() {
    this.userDataProvider.logOut();
    this.router.navigateByUrl('/login');
  }
}
