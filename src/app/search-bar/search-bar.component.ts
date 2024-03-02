import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import { ApiService} from "../services/api.service";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchQuery: string = '';
  ingredientsInPossession: string = '';
  Boissons: any = [];
  recipes = [
    { name: 'Spaghetti Bolognese', ingredients: ['pasta', 'tomato sauce', 'ground beef'] },
    { name: 'Chicken Stir-Fry', ingredients: ['chicken', 'vegetables', 'soy sauce'] },
    // Ajoutez d'autres plats avec leurs ingrédients
  ];
  protected ListBoissons: any;

  constructor(private apiService: ApiService) {}

  onSubmit() {
    // Logique de recherche en fonction des ingrédients en possession
    if (this.ingredientsInPossession.trim() !== '') {
      const searchIngredients = this.ingredientsInPossession.split(',');

      // Fait une requête à l'API pour obtenir les boissons qui peuvent être faites avec les ingrédients en possession
      // envoie la liste des ingrédients en possession à l'API
      this.apiService.GetBoisson(this.ingredientsInPossession).subscribe((content: any) => {
        this.ListBoissons = Array.isArray(content) ? content : [content];

        console.log('Content:', content);
        console.log('ListBoissons:', this.ListBoissons);

        if (this.ListBoissons[0] && this.ListBoissons[0].content) {
          try {
            const parsedContent = JSON.parse(this.ListBoissons[0].content);
            if (Array.isArray(parsedContent)) {
              this.ListBoissons = parsedContent;


              console.log(this.ListBoissons);
            } else {
              console.error('La propriété "content" n\'est pas un tableau JSON valide dans la réponse API.');
            }
          } catch (error) {
            console.error('Erreur lors de l\'analyse de la propriété "content" en JSON :', error);
          }
        } else {
          console.error('La propriété "content" n\'est pas présente dans la réponse API.');
        }
      });
    } else {
      // Si aucun ingrédient n'est saisi, réinitialisez la liste des recettes
      this.recipes = [
        { name: 'Spaghetti Bolognese', ingredients: ['pasta', 'tomato sauce', 'ground beef'] },
        { name: 'Chicken Stir-Fry', ingredients: ['chicken', 'vegetables', 'soy sauce'] },
        // Ajoutez d'autres plats avec leurs ingrédients
      ];
    }
  }
}


