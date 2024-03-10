import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "../services/api.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-ajout_Trajet',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './ajout_Trajet.component.html',
  styleUrl: './ajout_Trajet.component.css',
})
export class Ajout_TrajetComponent {
  private static cookieService: CookieService;
  depart: string = '';
  arrivee: string = '';
  date: string = '';
  heure: string = '';
  nbPlace: string = '';
  prix: string = '';
  conducteur: string = '';




  constructor(private cookieService: CookieService,private apiService: ApiService) {}

  //Ajout de trajet si l'utilisateur est authentifié
  ajoutTrajet() {
    console.log('ajout trajet component avant auth');
      console.log('ajout trajet component');
      // envoie les informations depart, arrivee, date, heure, nbPlace, prix, conducteur, passagers au backend a l'addresse http://localhost:3000/ajout_trajet

      this.apiService.AddTrajet(this.depart, this.arrivee, this.date, this.heure, this.nbPlace, this.prix,this.cookieService.get('token'));

  }

  isAuth() : boolean{
    return this.cookieService.get('token').length > 0;
  }



}
