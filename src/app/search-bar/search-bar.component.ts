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
  checked: boolean = false;
  Affiche_Carte: boolean = false;
  searchQuery: string = '';
  recherche: string = '';
  Boissons: any = [];
  url = '';
  recipes: any = [];
  protected ListBoissons: any;

  constructor(private apiService: ApiService) {}

  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    const label = document.getElementById('recherche');
    if(label!=null){
      if (isChecked) {
        label.textContent = 'Recherche par ingrédients :';
        this.checked = true;
      } else {
        label.textContent = 'Recherche par nom :';
        this.checked = false;
      }
    }
  }

  onSubmit() {
    this.Affiche_Carte = false;
    // Logique de recherche en fonction des ingrédients en possession
    if (this.checked){
      if (this.recherche.trim() !== '') {
        if(this.recherche.indexOf(',')!=-1){
          const searchIngredients = this.recherche.split(',');
        }
        else{
          const searchIngredients = this.recherche;
        }

        // Fait une requête à l'API pour obtenir les boissons qui peuvent être faites avec les ingrédients en possession
        // envoie la liste des ingrédients en possession à l'API
        this.apiService.GetBoissonParIngredient(this.recherche).subscribe((content: any) => {
          this.ListBoissons = Array.isArray(content) ? content : [content];

          console.log('Content:', content);
          console.log('ListBoissons:', this.ListBoissons);

          if (this.ListBoissons[0] && this.ListBoissons[0].content) {
            try {
              const parsedContent = JSON.parse(this.ListBoissons[0].content);
              if (Array.isArray(parsedContent)) {
                this.ListBoissons = parsedContent;
                this.recipes = parsedContent;
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
      }
    }
    else{
      this.apiService.GetBoissonParNom(this.recherche).subscribe((content: any) => {

        this.ListBoissons = content.content;

        console.log('Content:', content);
        console.log('ListBoissons:', this.ListBoissons);

        try {
          const jsonObject = JSON.parse(this.ListBoissons);
          console.log('json:', jsonObject);
          this.ListBoissons = jsonObject.results;
          this.recipes = jsonObject.results;
        } catch (error) {
            console.error('Erreur lors de l\'analyse de la chaîne JSON :', error);
        }
        
        /*
        if (this.ListBoissons[0] && this.ListBoissons[0].content) {
          try {
            const parsedContent = JSON.parse(this.ListBoissons[0].content);
            console.log(parsedContent);
            this.recipes = parsedContent;
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
        */
      });
    }
  }

  RecipeChosen(recipe: any) {
    // Logique pour choisir une recette
    console.log('Recette choisie :', recipe);
    this.apiService.GetCard(recipe).subscribe((response: any) => {
      // on récupère l'url de la recette
      this.url = JSON.parse(response.content).url;

      this.Affiche_Carte = true;

  });
  }
}


