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
      fetch('http://localhost:3080/ajout_trajet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.cookieService.get('token')}`
        },
        body: JSON.stringify({
          depart: this.depart,
          arrivee: this.arrivee,
          date: this.date,
          heure: this.heure,
          nbPlace: this.nbPlace,
          prix: this.prix,
          conducteur: this.cookieService.get('token'),
          username : this.cookieService.get('user')
        })
      })  .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });


  }

  isAuth() : boolean{
    return this.cookieService.get('token').length > 0;
  }



}
