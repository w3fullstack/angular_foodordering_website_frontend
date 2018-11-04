import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="dropdown" ngbDropdown (openChange)="toggled($event)">
  <button class="btn btn-primary" type="button" ngbDropdownToggle>
    Dropdown
  </button>
  <ul class="dropdown-menu" ngbDropdownMenu>
    <li class="dropdown-item">Icon Button</li>
    <li class="dropdown-item">Hero Button</li>
    <li class="dropdown-item">Default</li>
  </ul>
</div>
  `,
})
export class DropDownComponent implements ViewCell, OnInit {

  public renderValue;

  @Input() value;
  @Input() rowData: any;

  constructor() {  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  example() {
    alert(this.rowData.id);
  }

  toggled(event) {
    console.log(this.renderValue);
  }
}