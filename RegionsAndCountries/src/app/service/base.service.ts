import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  serverUrl: string = 'http://localhost:5036/';
  // serverUrl: string = "https://localhost:7195/";

  observables: any = {};

  constructor(
    private http: HttpClient
  ) { }

  getAll(table: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}api/${table}/GetAll`);
  }
  
  getHeaderNames(table: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}api/${table}/GetHeaderNames`);
  }

  // create(table: string, row: any): Observable<any[]> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  //   return this.http.post<any>(`${this.serverUrl}api/${table}/Create`, row, {headers: headers});
  // }

  create(table: string, row: any): Observable<any[]> {
    const formData = new FormData();
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        formData.append(key, row[key]);
      }
    }

    return this.http.post<any>(`${this.serverUrl}api/${table}/Create`, formData);
  }

  // update(table: string, row: any): Observable<any[]> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  //   return this.http.put<any>(`${this.serverUrl}api/${table}/Update`, row, {headers: headers});
  // }

  update(table: string, row: any): Observable<any[]> {
    const formData = new FormData();
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        formData.append(key, row[key]);
      }
    }

    return this.http.put<any>(`${this.serverUrl}api/${table}/Update`, formData);
  }

  delete(table: string, ids: number[]): Observable<any[]> {
    return this.http.delete<any>(`${this.serverUrl}api/${table}/Delete`, { body: ids });
  }
}
