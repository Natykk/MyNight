import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { RecipeHelperModule } from './recipe-helper/recipe-helper.module';
import {NgClass, NgForOf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {Ajout_TrajetComponent} from "./ajout_Trajet/ajout_Trajet.component";
import { AfficheTrajetComponent } from "./affiche-trajet/affiche-trajet.component";
import { MapComponent } from "./map/map.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [HttpClientModule, ApiService],
    imports: [RouterOutlet, HttpClientModule, RecipeHelperModule, NgForOf, NavbarComponent, NgTemplateOutlet, SearchBarComponent, NgStyle, NgClass, Ajout_TrajetComponent, AfficheTrajetComponent, MapComponent]
})
export class AppComponent {

  slides = [
    {
      title: 'What is Manage Your Night ?',
      content: 'Content for What is My Night?',
      style: { 'background-color': 'rgba(0, 0, 0, 0.6)' }
    },
    {
      title: 'Recipes',
      content: 'Content for Manger slide',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    },
    {
      title: 'Map',
      content: 'Content for Trouver un resto slide',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    },
    {
      title: 'Carpooling',

     content: 'Content for Retourner a la maison slide',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    },
    {
      title: 'About us',

      content: 'Content for A propos slide',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    }
  ];
  activeIndex = 0;
  ButtonChoisi: string = '';



  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;

  }

  changeSlide(index: number): void {
    this.activeIndex = index;
  }

  updateButtonChoisi(button: string) {
    this.ButtonChoisi = button;
  }





}
