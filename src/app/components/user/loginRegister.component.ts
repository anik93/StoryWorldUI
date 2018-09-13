import {Component} from '@angular/core';
import {User} from '../../classes/user/user.class';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {UserDataProvider} from '../../services/userDataProvider.service';
import {ProxyResponse} from '../../classes/response.class';

@Component({
  selector: 'loginRegister',
  templateUrl: './loginRegister.component.html',
  styleUrls: ['../../styles/styles.scss']
})
export class LoginRegisterComponent {

  loginUser: User = new User;
  registerUser: User = new User;
  restartPasswordUser: User = new User;
  terms: Boolean;
  tips: Boolean;
  cpass: String;

  constructor(private userDataProvider: UserDataProvider, private router: Router, private userService: UserService) {
    if (this.userDataProvider.isLoggedIn()) {
      this.router.navigateByUrl('');
    }

    this.terms = false;
    this.tips = false;
    this.cpass = null;
  }

  login() {
    this.userService.login(this.loginUser).then(res => this.handleLogin(res));
  }

  register() {
    this.userService.register(this.registerUser).then(res => this.handleRegister(res));
  }

  restartPassword() {
    this.userService.restartPassword(this.restartPasswordUser).then(res => this.handleRestart(res));
  }

  showTips() {
    this.tips = !this.tips;
  }

  isTips() {
    return this.tips;
  }

  acceptTerms() {
    this.terms = !this.terms;
  }

  isTerms() {
    return this.terms;
  }

  private handleLogin(res: ProxyResponse<User>) {
    if (res) {
      this.userDataProvider.logIn(res);
      this.router.navigate(['/']);
    }
  }

  private handleRegister(res: ProxyResponse<User>) {
    if (res) {
      this.registerUser = new User();
      this.cpass = null;
      this.terms = false;
    }
  }

  private handleRestart(res: ProxyResponse<User>) {
    if (res) {
      this.restartPasswordUser = new User();
    }
  }
}
