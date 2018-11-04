import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table/components/cell/cell-view-mode/view-cell';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { CustomEditComponent } from '../../custom-component/custom-edit/custom-edit.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Utils } from '../../common';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'button-view',
  template: `
  <button class="btn btn-md btn-success" (click)="onClick()"><i class="nb-menu"></i></button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() onUpdateStatus: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  onClick() {
    var self = this;
    const activeModal = this.modalService.open(OrderDetailComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.order = this.rowData;
  }
}

@Component({
  selector: 'pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit, OnDestroy {

  settings = {
    mode: 'inline',
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      save: false,
      cancel: false,
    },
    columns: {
      status: {
        title: 'Status',
        type: 'string',
        valuePrepareFunction: (status) => {
          if (status == 0) return 'Pending';
          if (status == 1) return 'Ready To Pickup';
        },
      },
      id: {
        title: 'Order ID',
        type: 'string',
        filter: true,
        sort: true,
        sortDirection:  'desc',
      },
      customer_name: {
        title: 'Customer Name',
        type: 'string',
        filter: false,
      },
      paid: {
        title: 'Paid',
        type: 'string',
      },
      created_at: {
        title: 'Created At',
        type: 'string',
        valuePrepareFunction: (timestamp) => {
          if (timestamp == 0)
            return '';
          var date = new Date(timestamp * 1000);
          var mm = date.getMonth()+1;
          var dd = date.getDate();
          var yy = date.getFullYear();
          var _hh = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
          var _mm = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
          var _ss = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
          return _hh + ":" + _mm + ":" + _ss + " " + mm + "/" + dd + "/" + yy;
        },
        filter: false,
      },
      ready_at: {
        title: 'Ready At',
        type: 'string',
        valuePrepareFunction: (timestamp) => {
          if (timestamp == 0)
            return '';
          var date = new Date(timestamp * 1000);
          var mm = date.getMonth()+1;
          var dd = date.getDate();
          var yy = date.getFullYear();
          var _hh = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
          var _mm = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
          var _ss = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
          return _hh + ":" + _mm + ":" + _ss + " " + mm + "/" + dd + "/" + yy;
        },
        filter: false,
      },
      view: {
        title: 'View',
        type: 'custom',
        renderComponent: ButtonViewComponent,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  currentUser: any;
  socket: any;

  constructor(private apiService: ApiService,
    private cookieService: CookieService,
    private toastrService: ToastrService,
    private router: Router) { 
      if (!(this.cookieService.check('user') && this.cookieService.get('user') != '')) {
        var redirect = '/auth/login';
        this.router.navigateByUrl(redirect);
        return;
      } else {
        this.currentUser = Utils.decodeJwt(this.cookieService.get('user'));
      }
      this.getInfo();
  }

  ngOnInit() {
    this.createSocket();  
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  createSocket() {
    console.log(environment.SERVER_URL);
    this.socket = io(environment.SERVER_URL);
    this.socket.on('message', (data) => {
      console.log('Order was updated, Refreshing data now...');
      this.getInfo();
    });
    this.socket.on('onconnected', (data) => {
      console.log(data);
      console.log('Socket.io was connected, user_id = ' + data.id);
    });
    this.socket.on('disconnect', (dava) => {
      console.log('Socket connection was disconnected');
    });
  }

  getInfo() {
    this.apiService.getPendingOrders(this.currentUser.restaurant.id).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                let data = [];
                for (let order of res.response) {
                  let price = 0;
                  for (let item of order.items) {
                    price += (item.price * (1 + item.tax));
                  }
                  data.push({
                    id: order.id,
                    customer_id: order.customer_id,
                    customer_name: order.customer_name,
                    customer_token: order.customer_token,
                    transaction_id: order.transaction_id,
                    status: order.status,
                    paid: price.toFixed(2),
                    created_at: order.created_at,
                    ready_at: order.ready_at,
                    items: order.items,
                  });
                }
                this.source.load(data);
              } else {
                  this.toastrService.error('Cannot fetch orders!');
              }
          } else {
              this.toastrService.error('Cannot fetch orders!');
          }
      });
  }
}
