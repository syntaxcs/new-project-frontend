import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PersonalService {
  constructor(
    private apiService: ApiService
  ) { }
  getPerson(): Observable<any> {
    return this.apiService.get(`personal`);
  }
  getPersonById(id): Observable<any> {
    return this.apiService.get(`personal/` + id);
  }
  addPerson (data): Observable<any> {
    return this.apiService.post('personal', data);
  }
  updatePerson(id: string, data): Observable<any> {
    return this.apiService.put('personal/' + id, data);
  }
  deletePerson(id: string): Observable<any> {
    return this.apiService.delete('personal/' + id);
  }
  
}
