import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-affiche-trajet',
  standalone: true,
  imports: [],
  templateUrl: './affiche-trajet.component.html',
  styleUrl: './affiche-trajet.component.css'
})
export class AfficheTrajetComponent {

  constructor(private apiService: ApiService) {}
  afficherTrajets() {
    // Fais une requete au backend pour recuperer les trajets

    this.apiService.getTrajets();
  }


}
