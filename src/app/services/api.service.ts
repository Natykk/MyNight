import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de l'API
  REST_API: string = 'http://localhost:3080/api';

  constructor(private httpClient: HttpClient) {}

  GetBoisson() {
    return this.httpClient.get<any[]>(this.REST_API);
  }
}