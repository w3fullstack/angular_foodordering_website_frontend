import { 
  Component, 
  OnInit,
  Input
} from '@angular/core';

import { ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Observable  } from 'rxjs/Observable';
import { of  } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material';
import { MatPaginator, PageEvent } from '@angular/material';
import { fromMatSort, sortRows, fromMatPaginator, paginateRows } from '../../services/datasource-utils';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: any;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedRows$: Observable<any>;
  totalRows$: Observable<number>;


  constructor(private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toastrService: ToastrService) {

  }

  ngOnInit() {
    const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);

    const rows$ = of(this.order.items);

    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
  }

  onClickReady() {
    this.apiService.updateOrderStatus(this.order.id, 1).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                this.toastrService.success('Updated successfully');
                this.order.status = 1;
                this.closeModal();
              } else {
                  this.toastrService.error('Update Failed!');
              }
          } else {
              this.toastrService.error('Update Failed!');
          }
      });
  }

  onClickComplete() {
    this.apiService.updateOrderStatus(this.order.id, 2).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                this.toastrService.success('Updated successfully');
                this.order.status = 2;
                this.closeModal();
              } else {
                  this.toastrService.error('Update Failed!');
              }
          } else {
              this.toastrService.error('Update Failed!');
          }
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
