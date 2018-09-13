import {Injectable} from '@angular/core';

import {ProxyService} from '../proxy.service';

import {Request} from '../../classes/request.class';
import {User} from '../../classes/user/user.class';

@Injectable()
export class UserService {

  constructor(private proxyService: ProxyService) {}

  login(user: User) {
    let request = new Request();
    request.setUser(user);

    return this.proxyService.post<User>('user/login', request);
  }

  register(user: User) {
    let request = new Request();
    request.setUser(user);

    return this.proxyService.post<User>('user/register', request);
  }

  restartPassword(user: User) {
    let request = new Request();
    request.setUser(user);

    return this.proxyService.post<User>('user/restartPassword', request);
  }

  logOut(token: String) {
    let request = new Request();
    request.setToken(token);

    return this.proxyService.post<User>('user/logout', request);
  }

  get(id: number, token: string) {
    return this.proxyService.get<User>('user/' + id, token);
  }

  update(user: User, token: String) {
    let request = new Request();
    request.setUser(user);
    request.setToken(token);

    return this.proxyService.put<User>('user/updateUser', request);
  }

  changePassword(user: User, token: String) {
    let request = new Request();
    request.setUser(user);
    request.setToken(token);

    return this.proxyService.put<User>('user/changePassword', request);
  }

  getUsers(token: String, page: Number, sizePage: Number) {
    let request = new Request();
    request.setToken(token);
    request.setPage(page);
    request.setSizePage(sizePage);

    return this.proxyService.post<User>('user/getUsers', request);
  }

  block(user: User, token: String) {
    let request = new Request();
    request.setUser(user);
    request.setToken(token);

    return this.proxyService.put('user/block', request);
  }

  delete(id: number, token: string) {
    return this.proxyService.delete('user/' + id, token);
  }

}
