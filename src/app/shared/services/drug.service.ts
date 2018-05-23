import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DrugService {
  constructor(
    private apiService: ApiService
  ) { }
  getDrug(): Observable<any> {
    return this.apiService.get(`Drug`);
  }
  getDrugById(id): Observable<any> {
    return this.apiService.get(`Drug/` + id);
  }
  addDrug(data): Observable<any> {
    return this.apiService.post('Drug', data);
  }
  updateDrug(id: string, data): Observable<any> {
    return this.apiService.put('Drug/' + id, data);
  }
  deleteDrug(id: string): Observable<any> {
    return this.apiService.delete('Drug/' + id);
  }
  
}
