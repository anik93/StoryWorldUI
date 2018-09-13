import {ResponseMessage} from './responseMessage.class';

export class ProxyResponse<T> {
  private token: string;
  private success: boolean;
  private message: ResponseMessage;
  private t: T;
  private list: Array<T>;
  private counter: number;

  constructor(data: any) {
    this.token = data.token;
    this.success = data.success;
    this.message = data.message;
    this.t = data.t;
    this.list = data.list;
    this.counter = data.counter;
  }

  public getToken() {
    return this.token;
  }

  public getSuccess() {
    return this.success;
  }

  public getMessage() {
    return this.message;
  }

  public getT() {
    return this.t;
  }

  public getList() {
    return this.list;
  }

  public getCounter() {
    return this.counter;
  }

}
