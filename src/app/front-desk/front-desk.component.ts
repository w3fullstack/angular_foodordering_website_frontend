import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './front-desk-menu';

@Component({
  selector: 'front-desk',
  template: `
    <food-ordering-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </food-ordering-layout>
  `,
})
export class FrontDeskComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
