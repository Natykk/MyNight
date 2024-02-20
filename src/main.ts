import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BoissonComponent } from './app/components/boisson/boisson.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  
