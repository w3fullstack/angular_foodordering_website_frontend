import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'menu',
    component: MenuComponent,
  }, {
    path: 'users',
    component: UsersComponent,
  }, {
    path: 'settings',
    component: SettingsComponent,
  }, {
    path: '**',
    component: DashboardComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
