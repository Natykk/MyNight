import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { RecipeHelperModule } from './recipe-helper/recipe-helper.module';
import {NgForOf} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, RecipeHelperModule, NgForOf,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [HttpClientModule,ApiService]

})
export class AppComponent {
  slides = [
    {
      title: 'What is My Night?',
      content: 'MyNight (Manage your night) is a service for managing your parties.',
      style: { 'background-color': 'rgba(0, 0, 0, 0.6)' }
    },
    {
      title: 'Manger',
      content: 'Content for Manger slide',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    },
    {
      title: 'Trouver un resto',
      content: 'slide Trouver un resto ',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    },
    {
      title: 'Retourner a la maison',
      content: 'Content for Retourner a la maison slide',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    },
    {
      title: 'A propos',
      content: 'Content for A propos slide',
      style: { 'background-color': 'rgba(0, 0, 0, 0.3)' }
    }
  ];
  activeIndex = 0;

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
  }

  changeSlide(index: number): void {
    this.activeIndex = index;
  }

}
