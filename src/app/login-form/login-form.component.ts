import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: 'SignIn' | 'Login' }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  connection(){
    console.log("Connection !");
  }

  accountCreation(){
    console.log("CREATION DE COMPTE !");
  }
}
