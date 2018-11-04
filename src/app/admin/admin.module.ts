import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddMenuModalComponent } from './menu/add-menu-modal/add-menu-modal.component';
import { AddCagetoryModalComponent } from './menu/add-cagetory-modal/add-cagetory-modal.component';
import { AddItemModalComponent } from './menu/add-item-modal/add-item-modal.component';
import { FormsModule } from '@angular/forms';
import { DropDownComponent } from './users/drop-down/drop-down.component';
import { CustomMenuComponent } from '../custom-component/custom-menu/custom-menu.component';
import { CustomConfirmComponent } from '../custom-component/custom-confirm/custom-confirm.component';
import { CustomEditComponent } from '../custom-component/custom-edit/custom-edit.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdminRoutingModule,
    NgxEchartsModule, 
    Ng2SmartTableModule,
    NgxChartsModule,
    FormsModule,
    FileUploadModule,
  ],
  declarations: [
    DashboardComponent, 
    MenuComponent, 
    UsersComponent, 
    SettingsComponent, 
    CustomMenuComponent,
    CustomEditComponent,
    AdminComponent, 
    AddMenuModalComponent, AddCagetoryModalComponent, AddItemModalComponent, 
    DropDownComponent],
  entryComponents: [
    AddMenuModalComponent, AddCagetoryModalComponent, AddItemModalComponent, DropDownComponent,
    CustomMenuComponent, CustomEditComponent
  ]
})
export class AdminModule { }
