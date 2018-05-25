import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class EvalutionService {
  constructor(
    private apiService: ApiService
  ) { }
  getEva(): Observable<any> {
    return this.apiService.get(`evalution`);
  }
  getEvaById(id): Observable<any> {
    return this.apiService.get(`evalution/` + id);
  }
  addEva(data): Observable<any> {
    return this.apiService.post('Evalution', data);
  }
  updateEva(id: string, data): Observable<any> {
    return this.apiService.put('evalution/' + id, data);
  }
  deleteEva(id: string): Observable<any> {
    return this.apiService.delete('evalution/' + id);
  }
  
}
