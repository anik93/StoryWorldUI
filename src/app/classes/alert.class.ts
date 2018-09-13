import {ResponseMessage} from './responseMessage.class';
import {AlertStatus} from './alertStatus.enum';

export class Alert {

  private status: AlertStatus;
  private text: string;

  constructor(responseMessage?: ResponseMessage) {
    if (responseMessage) {
      this.status = responseMessage.status;
      this.text = responseMessage.text;
    }
  }

  public setStatus(status: AlertStatus) {
    this.status = status;
  }

  public getStatus() {
    return this.status;
  }

  public setMessage(text: string) {
    this.text = text;
  }

  public getMessage() {
    return this.text;
  }

}
