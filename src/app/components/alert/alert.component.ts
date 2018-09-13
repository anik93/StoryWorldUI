import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {Alert} from '../../classes/alert.class';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: `./alert.component.html`,
  styleUrls: [`../../styles/styles.scss`]
})
export class AlertComponent implements OnDestroy {

  private alerts: Array<Alert>;
  private subscription: Subscription;

  constructor(private alertService: AlertService) {
    this.alerts = new Array<Alert>();
    this.subscription = this.alertService.getAlerts().subscribe(alert => this.alerts.push(alert));
  };

  getAlert() {
    return this.alerts;
  }

  delete(alert: Alert) {
    let index = this.alerts.indexOf(alert, 0);
    if (index > -1) {
      this.alerts.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
