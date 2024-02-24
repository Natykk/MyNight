import { Component,OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-boisson',
  templateUrl: './boisson.component.html',
  styleUrl: './boisson.component.css',
})
export class BoissonComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  // affiche hello world
  //title = 'Hello World';
  Boissons: any = [];
  
  ngOnInit(): void {
    this.apiService.GetBoisson().subscribe(res =>{
      console.log(res);
      this.Boissons = res;
    });
  }
}