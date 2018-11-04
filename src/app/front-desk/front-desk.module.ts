import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingComponent, ButtonViewComponent } from './pending/pending.component';
import { CompletedComponent, ButtonRefundComponent } from './completed/completed.component';
import { FrontDeskComponent } from './front-desk.component';
import { FrontDeskRoutingModule } from './front-desk-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatExpansionModule, 
  MatFormFieldModule, 
  MatIconModule, 
  MatButtonModule, 
  MatNativeDateModule, 
  MatDatepickerModule, 
  MatTableDataSource,
  MatTableModule
} from '@angular/material';
import { CustomConfirmComponent } from '../custom-component/custom-confirm/custom-confirm.component';
import { MatListModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FrontDeskRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule, 
    MatListModule, MatExpansionModule, MatSortModule,  
    MatPaginatorModule
  ],
  declarations: [
    PendingComponent, 
    CompletedComponent,
    FrontDeskComponent,
    OrderDetailComponent,
    ButtonViewComponent,
    OrderDetailComponent,
    ButtonRefundComponent,
  ],
  entryComponents: [
    ButtonViewComponent,
    ButtonRefundComponent,
    OrderDetailComponent,
  ]
})
export class FrontDeskModule {}
