import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoissonComponent } from '../components/boisson/boisson.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [BoissonComponent],
  imports: [
    CommonModule
  ],
  exports: [BoissonComponent],
  providers: [HttpClientModule]
})
export class RecipeHelperModule { }
