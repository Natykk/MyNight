import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de l'API
  REST_API: string = 'http://localhost:3080/api';
  private value: any;

  constructor(private httpClient: HttpClient) {}

  GetBoisson(ingredientsInPossession: string) {
    return this.httpClient.post<any[]>(`${this.REST_API}`, { ingredientsInPossession });

    //return this.httpClient.get<any[]>(this.REST_API);
  }
}
