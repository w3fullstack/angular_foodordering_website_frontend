import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontDeskComponent } from './front-desk.component';
import { PendingComponent } from './pending/pending.component';
import { CompletedComponent } from './completed/completed.component';

const routes: Routes = [{
  path: '',
  component: FrontDeskComponent,
  children: [{
    path: 'pending',
    component: PendingComponent,
  }, {
    path: 'completed',
    component: CompletedComponent,
  }, {
    path: '**',
    component: PendingComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontDeskRoutingModule { }
