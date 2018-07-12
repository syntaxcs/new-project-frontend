import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(
    private apiService: ApiService
  ) { }
  login(data): Observable<any> {
    return this.apiService.post('login', data);
  }

}
