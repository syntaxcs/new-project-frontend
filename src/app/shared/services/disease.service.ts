import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DiseaseService {
  constructor(
    private apiService: ApiService
  ) { }
  getDis(): Observable<any> {
    return this.apiService.get(`disease`);
  }
  getDisById(id): Observable<any> {
    return this.apiService.get(`disease/` + id);
  }
  addDis(data): Observable<any> {
    return this.apiService.post('Disease', data);
  }
  updateDis(id: string, data): Observable<any> {
    return this.apiService.put('disease/' + id, data);
  }
  deleteDis(id: string): Observable<any> {
    return this.apiService.delete('disease/' + id);
  }
  
}
