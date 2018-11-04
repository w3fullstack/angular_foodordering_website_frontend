import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../../../common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'add-menu-modal',
  templateUrl: './add-menu-modal.component.html',
  styleUrls: ['./add-menu-modal.component.scss']
})
export class AddMenuModalComponent implements OnInit {
  currentUser: any;
  addMenuForm: FormGroup;
  constructor(private activeModal: NgbActiveModal, private api_service: ApiService, private cookieService: CookieService,
              private toastrService: ToastrService, private fb: FormBuilder) {
    this.currentUser = Utils.decodeJwt(this.cookieService.get('user'));
    this.addMenuForm = this.fb.group({
      newMenuName: ['', [Validators.required, Validators.minLength(1)]],
    });

  }

  addMenu() {
    if (this.addMenuForm.controls.newMenuName.invalid) return;
    console.log(this.addMenuForm.value.newMenuName);
    this.api_service.addMenu(this.addMenuForm.value.newMenuName, this.currentUser.restaurant.id).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                this.toastrService.success('Successfully added!');
                this.activeModal.close();
                this.activeModal.dismiss();
              } else {
                  this.toastrService.error(res.msg);
              }
          } else {
              this.toastrService.error('Cannot add this!');
          }
      });
  }
  closeModal() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
  }

}
