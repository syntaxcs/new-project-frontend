import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PhysicalService {
  constructor(
    private apiService: ApiService
  ) { }
  getPhy(): Observable<any> {
    return this.apiService.get(`physical`);
  }
  getPhyById(id): Observable<any> {
    return this.apiService.get(`physical/` + id);
  }
  addPhy (data): Observable<any> {
    return this.apiService.post('physical', data);
  }
  updatePhy(id: string, data): Observable<any> {
    return this.apiService.put('physical/' + id, data);
  }
  deletePhy(id: string): Observable<any> {
    return this.apiService.delete('physical/' + id);
  }
  
}
