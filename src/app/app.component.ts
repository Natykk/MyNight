import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { Mod1Module } from '../mod1/mod1.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { NgFor } from '@angular/common';
import { BoissonComponent } from './components/boisson/boisson.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,BoissonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [HttpClientModule,ApiService]

})
export class AppComponent {

}
