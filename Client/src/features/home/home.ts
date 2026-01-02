import { Component, signal } from '@angular/core';
import { Register } from '../account/register/register';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected regesterMode = signal(false);
  showRegisterMode(value: boolean) {
    this.regesterMode.set(value);
  }
}
