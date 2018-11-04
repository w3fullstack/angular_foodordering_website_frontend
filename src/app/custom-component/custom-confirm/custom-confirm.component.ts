import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../../common';
import { CookieService } from 'ngx-cookie-service';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-confirm',
  templateUrl: './custom-confirm.component.html',
  styleUrls: ['./custom-confirm.component.scss']
})
export class CustomConfirmComponent implements OnInit {
  
  @Input() title: string;
  @Input() description: string;

  currentUser: any;

  constructor(private activeModal: NgbActiveModal, private api_service: ApiService, private cookieService: CookieService,
              private toastrService: ToastrService, private fb: FormBuilder) {
  }

  onClickOk() {
    this.activeModal.close();
    this.closeModal();
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
  }

}
