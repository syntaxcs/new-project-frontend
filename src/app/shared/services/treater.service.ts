import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TreaterService {
  constructor(
    private apiService: ApiService
  ) { }
  getTre(): Observable<any> {
    return this.apiService.get(`treater`);
  }
  getTreById(id): Observable<any> {
    return this.apiService.get(`treater/` + id);
  }
  addTre(data): Observable<any> {
    return this.apiService.post('treater', data);
  }
  updateTre(id: string, data): Observable<any> {
    return this.apiService.put('treater/' + id, data);
  }
  deleteTre(id: string): Observable<any> {
    return this.apiService.delete('treater/' + id);
  }
  
}
