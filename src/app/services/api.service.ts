import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de l'API
  REST_API: string = 'http://localhost:3080/api';
  CARD_API: string = 'http://localhost:3080/card';
  
  


  constructor(private httpClient: HttpClient) {}

  GetBoisson(ingredientsInPossession: string) {
    return this.httpClient.post<any[]>(`${this.REST_API}`, { ingredientsInPossession });

  }

  GetCard(id : string) {
    return this.httpClient.post<any[]>(`${this.CARD_API}`, { id });
  }

  

  
}
