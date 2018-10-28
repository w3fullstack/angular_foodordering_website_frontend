import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './admin-menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
