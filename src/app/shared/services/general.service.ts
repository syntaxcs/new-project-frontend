import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class GeneralService {
  constructor(
    private apiService: ApiService
  ) { }
  getGen(): Observable<any> {
    return this.apiService.get(`general`);
  }
  getGenById(id): Observable<any> {
    return this.apiService.get(`general/` + id);
  }
  addGen(data): Observable<any> {
    return this.apiService.post('General', data);
  }
  updateGen(id: string, data): Observable<any> {
    return this.apiService.put('general/' + id, data);
  }
  deleteGen(id: string): Observable<any> {
    return this.apiService.delete('general/' + id);
  }
  
}
