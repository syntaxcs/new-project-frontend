import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class FollowService {
  constructor(
    private apiService: ApiService
  ) { }
  getFollow(): Observable<any> {
    return this.apiService.get(`follow`);
  }
  addFollow (data): Observable<any> {
    return this.apiService.post('follow', data);
  }
  updateFollow(id: string, data): Observable<any> {
    return this.apiService.put('follow/' + id, data);
  }
  deleteFollow(id: string): Observable<any> {
    return this.apiService.delete('follow/' + id);
  }
  
}
