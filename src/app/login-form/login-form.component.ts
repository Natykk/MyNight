import { Component,EventEmitter,Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from '../navbar/navbar.component';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  // Créez un formulaire réactif pour le formulaire de connexion
  loginForm = new FormGroup({
    user: new FormControl(''),
    mdp: new FormControl('')
  });
  mdp_error = false;
  @Output() userLoggedIn = new EventEmitter<string>(); // EventEmitter pour émettre la valeur de l'utilisateur

  
  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: 'SignIn' | 'Login' }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  connection()  {
    // Récupération des données du formulaire
    const URL_Auth = 'http://localhost:3080/auth';
    const mdp = this.loginForm.value.mdp;
    const user = this.loginForm.value.user;
    console.log('Données du formulaire :', user, mdp);

    // Envoi des données au serveur
    fetch(URL_Auth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, mdp }),
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.success === true) {
          console.log('Connexion réussie');
          // stocke le token dans un cookie
          document.cookie = `token=${data.token}`;
          // stocke le nom d'utilisateur dans un cookie
          document.cookie = `user=${user}`;

          this.dialogRef.close();
        } else {
          // affiche un message d'erreur en html
          this.mdp_error = true;
          console.log('Connexion échouée');
        }
      })
      .catch((error) => {
        console.error('Erreur :', error);
      });

    
  }

  accountCreation() {
    const URL_Auth = 'http://localhost:3080/signup';

    // Récupération des données du formulaire
    const user = this.loginForm.value.user;
    const mdp = this.loginForm.value.mdp;
    console.log('Données du formulaire :', user, mdp);



    // Envoi des données au serveur

    fetch(URL_Auth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, mdp }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Réponse du serveur :', data);
        if (data.success === true) {
          console.log('Création de compte réussie');
          this.dialogRef.close();
        } else {
          // affiche un message d'erreur en html
          console.log('Création de compte échouée');
        }
      })
      .catch((error) => {
        console.error('Erreur :', error);
      });

    
  }
}
