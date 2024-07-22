import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isOpen: boolean = false;

  constructor() {}
  openMenu() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }
}
