import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de l'API
  REST_API: string = 'http://localhost:3080/api';
  ADD_TRAJET: string = 'http://localhost:3080/ajout_trajet';
  GET_TRAJET: string = 'http://localhost:3080/getTrajets';
  private value: any;

  constructor(private httpClient: HttpClient) {}

  GetBoisson(ingredientsInPossession: string) {
    return this.httpClient.post<any[]>(`${this.REST_API}`, { ingredientsInPossession });

    //return this.httpClient.get<any[]>(this.REST_API);
  }

  AddTrajet(depart: string, arrivee: string, date: string, heure: string, nbPlace: string, prix: string, conducteur: string) {
    console.log('service add trajet');
    return this.httpClient.post<any>(`${this.ADD_TRAJET}`, { depart, arrivee, date, heure, nbPlace, prix, conducteur });
  }

  getTrajets() {
    return this.httpClient.get<any[]>(`${this.REST_API}`);
  }
}
