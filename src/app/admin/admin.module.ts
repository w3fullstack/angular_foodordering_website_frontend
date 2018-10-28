import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdminRoutingModule
  ],
  declarations: [DashboardComponent, MenuComponent, UsersComponent, SettingsComponent, AdminComponent]
})
export class AdminModule { }
