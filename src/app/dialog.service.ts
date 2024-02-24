import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent} from "./login-form/login-form.component";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private loginStatus: 'SignIn' | 'Login' = 'Login';


  constructor(private dialog: MatDialog) {}

  openLoginDialog(status: 'SignIn' | 'Login'): void {
    this.loginStatus = status;
    this.dialog.open(LoginFormComponent, {
      width: '300px', // Ajustez la largeur selon vos besoins
      data: { status: this.loginStatus }, // Passez le statut à la modal
    });
  }
  getLoginStatus(): 'SignIn' | 'Login' {
    return this.loginStatus;
  }
}
