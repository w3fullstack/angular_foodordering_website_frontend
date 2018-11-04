import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { CustomConfirmComponent } from '../custom-confirm/custom-confirm.component';
import { ApiService } from '../../services/api.service';
import { CustomEditComponent } from '../custom-edit/custom-edit.component';

@Component({
  selector: 'custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss']
})
export class CustomMenuComponent implements OnInit {

  @Input() items;
  @Input() edit_enabled = true;
  @Output() onSelect:EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit:EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete:EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: NgbModal,
  private apiService: ApiService) { }

  ngOnInit() {
  }

  onClickSelect(event: any) {
    for (let item of this.items) {      
      item.is_selected = false;
    }
    event.is_selected = true;
    this.onSelect.emit(event);
  }

  onClickEdit(event: any) {
    var self = this;
    const activeModal = this.modalService.open(CustomEditComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.close = function(newData) {
      self.callbackEdit(event, newData);
    };
    activeModal.componentInstance.title = " Edit " + (event.is_category ? "Category" : "Item");
    activeModal.componentInstance.hasFileInput = event.is_category;
    activeModal.componentInstance.content = event.title;
  }
  
  onClickDelete(event: any) {    
    var self = this;
    const activeModal = this.modalService.open(CustomConfirmComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.close = function() {
      self.callbackDelete(event);
    };
    activeModal.componentInstance.title = event.title;
    activeModal.componentInstance.description = "Wolud you like to delete this " + (event.is_category ? "category" : "item") + "?";
  } 

  callbackDelete(event: any) {
    this.onDelete.emit(event);
  }

  callbackEdit(event: any, newData: any) {
    event.name = newData.newName;
    event.thumbnail = newData.newThumbnail;
    this.onEdit.emit(event);
  }
}
