import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  burgerSwitch = false

  openBurger(): void {
    this.burgerSwitch = !this.burgerSwitch
  }
  closeBurger(): void {
    this.burgerSwitch = false
  }
}
