import {Injectable} from '@angular/core';

import {ProxyService} from '../proxy.service';

import {Request} from '../../classes/request.class';
import {User} from '../../classes/user/user.class';
import {TokenType} from '../../classes/user/token.enum';

@Injectable()
export class TokenService {

  constructor(private proxyService: ProxyService) {}

  confirmRegister(user: User, tokenType: TokenType, token: String) {
    let request = new Request();
    request.setUser(user);
    request.setToken(token);
    request.setTokenType(tokenType);

    return this.proxyService.post('user/confirmRegister', request);
  }

  remindPassword(user: User, tokenType: TokenType, token: String) {
    let request = new Request();
    request.setUser(user);
    request.setToken(token);
    request.setTokenType(tokenType);

    return this.proxyService.put('user/remindPassword', request);
  }

}
