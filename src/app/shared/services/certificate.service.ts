import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class CertificateService {
  constructor(
    private apiService: ApiService
  ) { }
  getCer(): Observable<any> {
    return this.apiService.get(`certificate`);
  }
  getCerById(id): Observable<any> {
    return this.apiService.get(`certificate/` + id);
  }
  addCer(data): Observable<any> {
    return this.apiService.post('certificate', data);
  }
  updateCer(id: string, data): Observable<any> {
    return this.apiService.put('certificate/' + id, data);
  }
  deleteCer(id: string): Observable<any> {
    return this.apiService.delete('certificate/' + id);
  }
  
}
