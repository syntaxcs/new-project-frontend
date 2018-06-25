import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SummaryService {
  constructor(
    private apiService: ApiService
  ) { }
  getSummary(): Observable<any> {
    return this.apiService.get(`summary`);
  }
  getSummaryById(id): Observable<any> {
    return this.apiService.get(`summary/` + id);
  }
  getSummaryPdf(): Observable<any> {
    return this.apiService.get(`summary/getpdf/` +'1');
  }
  addSummary(data): Observable<any> {
    return this.apiService.post('summary', data);
  }
  updateSummary(id: string, data): Observable<any> {
    return this.apiService.put('summary/' + id, data);
  }
  deleteSummary(id: string): Observable<any> {
    return this.apiService.delete('summary/' + id);
  }
  
}
