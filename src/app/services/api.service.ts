import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de l'API
  REST_API_INGREDIENT: string = 'http://localhost:3080/api_ingredient';
  REST_API_NOM: string = 'http://localhost:3080/api_nom';
  CARD_API: string = 'http://localhost:3080/card';
  
  


  constructor(private httpClient: HttpClient) {}

  GetBoissonParIngredient(recherche: string) {
    console.log("recherche %s", recherche);
    return this.httpClient.post<any[]>(`${this.REST_API_INGREDIENT}`, { recherche });
  }

  GetBoissonParNom(recherche: string){
    return this.httpClient.post<any[]>(`${this.REST_API_NOM}`, { recherche });
  }

  GetCard(id : string) {
    return this.httpClient.post<any[]>(`${this.CARD_API}`, { id });
  }

  

  
}
