import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';

import {AlertService} from './alert.service';

import {Request} from '../classes/request.class';
import {ProxyResponse} from '../classes/response.class';
import {Alert} from '../classes/alert.class';

@Injectable()
export class ProxyService {
  private options: RequestOptions;
  private headers: Headers;

  constructor(private http: Http, private alertService: AlertService, private router: Router) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  public post<T>(url: String, request: Request) {
    let body = JSON.stringify(request);

    return this.http.post('http://localhost:8080/core/' + url, body, this.options)
      .toPromise()
      .then((data) => {return this.handleResponse(data); })
      .catch((err) => {this.handleError(err); });
  }

  public get<T>(url: String, token: string) {
    if (token != null) {
      this.headers = new Headers({'Content-Type': 'application/json'});
      this.headers.append('Token', token);
      this.options = new RequestOptions({headers: this.headers});
    }
    return this.http.get('http://localhost:8080/core/' + url, this.options)
      .toPromise()
      .then((data) => {return this.handleResponse(data); })
      .catch((err) => {this.handleError(err); });
  }

  public put<T>(url: String, request: Request) {
    let body = JSON.stringify(request);

    return this.http.put('http://localhost:8080/core/' + url, body, this.options)
      .toPromise()
      .then((data) => {return this.handleResponse(data); })
      .catch((err) => {this.handleError(err);});
  }

  public delete<T>(url: String, token: string) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.headers.append('Token', token);
    this.options = new RequestOptions({headers: this.headers});

    return this.http.delete('http://localhost:8080/core/' + url, this.options)
      .toPromise()
      .then((data) => {return this.handleResponse(data)})
      .catch((err) => {this.handleError(err)});
  }

  private handleResponse(data: Response) {
    let response = new ProxyResponse(data.json());
    if (response.getMessage() != null) {
      let alert = new Alert(response.getMessage());
      this.alertService.addAlert(alert);
    }
    if (response.getSuccess()) {
      return response;
    }
  }

  private handleError(error: any) {
    if (error.status === 401) {

    } else {

    }
  }

}
