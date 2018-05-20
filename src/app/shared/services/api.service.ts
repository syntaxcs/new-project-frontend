import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
@Injectable()

export class ApiService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
      this.router.navigate(['/login']);
    }
    return Observable.throw(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`,
      { headers: this.setHeaders(), params: params })
      .catch(this.formatErrors.bind(this));
  }
  getContent(path: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`,
      {
        headers: this.setHeaders(),
        responseType: 'blob'
      })
      .catch(this.formatErrors.bind(this));
  }
  postContent(path: string, body: Object = {}): any {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      {
        headers: this.setHeaders(),
        responseType: 'blob'
      })
      .catch(this.formatErrors.bind(this));
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors.bind(this));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors.bind(this));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors.bind(this));
  }
}