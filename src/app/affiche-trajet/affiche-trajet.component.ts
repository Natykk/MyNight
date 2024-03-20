import {Component, ElementRef, TemplateRef, ViewChild,NgModule} from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import {NgClass, NgForOf, NgStyle, NgTemplateOutlet,NgFor} from "@angular/common";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-affiche-trajet',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './affiche-trajet.component.html',
  styleUrl: './affiche-trajet.component.css'
})
export class AfficheTrajetComponent {
  protected listTrajets: any;
  GET_TRAJET: string = 'http://localhost/getTrajets';
  constructor(private apiService: ApiService,private httpClient: HttpClient) {}
  afficherTrajets() {
    // Fais une requete au backend pour recuperer les trajets
    fetch(this.GET_TRAJET, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })  .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // stocke les trajets dans une variable
        this.listTrajets = data;
      });

  }

  ngOnInit() {
    this.afficherTrajets();
  }


}
