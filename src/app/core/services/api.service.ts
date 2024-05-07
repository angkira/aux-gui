import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseUrl: string = environment.baseUrl || '';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer <your-token>',
  });

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`, { headers: this.headers });
  }

  post(url: string, data: any) {
    return this.http.post(`${this.baseUrl}/${url}`, data, {
      headers: this.headers,
    });
  }

  put(url: string, data: any) {
    return this.http.put(`${this.baseUrl}/${url}`, data, {
      headers: this.headers,
    });
  }

  delete(url: string) {
    return this.http.delete(`${this.baseUrl}/${url}`, {
      headers: this.headers,
    });
  }
}
