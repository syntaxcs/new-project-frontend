import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class OfficerService {
  constructor(
    private apiService: ApiService
  ) { }
  getFicer(): Observable<any> {
    return this.apiService.get(`officer`);
  }
  getFicerById(id): Observable<any> {
    return this.apiService.get(`Officer/` + id);
  }
  addFicer(data): Observable<any> {
    return this.apiService.post('Officer', data);
  }
  updateFicer(id: string, data): Observable<any> {
    return this.apiService.put('Officer/' + id, data);
  }
  deleteFicer(id: string): Observable<any> {
    return this.apiService.delete('Officer/' + id);
  }
  
}
