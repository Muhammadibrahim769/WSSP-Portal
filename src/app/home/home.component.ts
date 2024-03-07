import { Component } from '@angular/core';

import { User } from '@app/_models';

@Component({
  selector: "router-outlet", templateUrl: 'home.component.html' })
export class HomeComponent {
  user: User;

  constructor() {
  }
  ngOnInit() {}
}
