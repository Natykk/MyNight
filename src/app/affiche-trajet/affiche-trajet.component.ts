import {Component, ElementRef, TemplateRef, ViewChild,NgModule} from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import {NgClass, NgForOf, NgStyle, NgTemplateOutlet,NgFor,NgIf} from "@angular/common";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-affiche-trajet',
  standalone: true,
  imports: [NgForOf,ReactiveFormsModule,MatIcon,MatFormField,FormsModule,NgIf],
  templateUrl: './affiche-trajet.component.html',
  styleUrl: './affiche-trajet.component.css'
})
export class AfficheTrajetComponent {
  depart: string = '';
  arrivee: string = '';
  date: string = '';
  trajets: any[] = [];
  aff_trajets: boolean = false;

  constructor(private apiService: ApiService,private httpClient: HttpClient) {}

  afficherTrajets() {
    this.aff_trajets = false;
    const depart = this.depart;
    const arrivee = this.arrivee;
    const date = this.date;

    console.log('Données du formulaire :', depart, arrivee, date);

    // Envoi des données au serveur
    fetch(`http://localhost:3080/get_trajet?depart=${depart}&arrivee=${arrivee}&date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
        this.trajets = data;
        this.aff_trajets = true;
    });
  }
  
  selectTrajet(trajetId: string) {
    
  }
}
