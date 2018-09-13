import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {TranslateService} from 'ng2-translate';

import {Alert} from '../classes/alert.class';

@Injectable()
export class AlertService {

  private alert = new Subject<Alert>();

  constructor(private translateService: TranslateService) {}

  public addAlert(alert: Alert) {
    alert.setMessage(this.translateService.instant(alert.getMessage()));
    this.alert.next(alert);
  }

  public getAlerts(): Observable<Alert> {
    return this.alert.asObservable();
  }

}
