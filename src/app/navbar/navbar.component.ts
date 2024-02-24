// navbar.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import {LoginFormComponent} from "../login-form/login-form.component";
import { DialogService} from "../dialog.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    LoginFormComponent
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() activeIndex: number = 0;
  @Output() slideChange: EventEmitter<number> = new EventEmitter<number>();
  constructor(private dialogService: DialogService) {}

  openLoginDialog(): void {

    this.dialogService.openLoginDialog('Login');

  }
  openSignInDialog(): void{
    this.dialogService.openLoginDialog('SignIn');
  }
  navigateTo(index: number): void {
    this.slideChange.emit(index);
  }
}
