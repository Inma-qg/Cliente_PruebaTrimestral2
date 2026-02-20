import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Serie {
  id?: string | number;
  title: string;
  channel: string;
  rating: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  //api existente
  private apiUrl = 'https://peticiones.online/api/series';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  create(payload: { title: string; channel: string; rating: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
