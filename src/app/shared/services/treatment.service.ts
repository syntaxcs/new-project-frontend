import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TreatmentService {
  constructor(
    private apiService: ApiService
  ) { }
  getTreat(): Observable<any> {
    return this.apiService.get(`treatment`);
  }
  getTreatById(id): Observable<any> {
    return this.apiService.get(`treatment/` + id);
  }
  addTreat(data): Observable<any> {
    return this.apiService.post('treatment', data);
  }
  updateTreat(id: string, data): Observable<any> {
    return this.apiService.put('treatment/' + id, data);
  }
  deleteTreat(id: string): Observable<any> {
    return this.apiService.delete('treatment/' + id);
  }
  
}
