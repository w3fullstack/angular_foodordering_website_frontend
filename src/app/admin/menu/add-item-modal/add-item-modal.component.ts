import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Utils } from '../../../common';
import { NbMenuService } from '../../../@nebular/theme/components/menu/menu.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FileService } from '../../../services/file.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {

  @Input() menu_id;
  @Input() category_id;

  itemDetailForm: any;

  imageUploaded: boolean = false;
  imageUploadFailed: boolean = false;
  uploadPercent: any = 100;
  tempThumbnail: any;
  linkThunbnail: any = '';

  constructor(private activeModal: NgbActiveModal,
    private api_service: ApiService,
    private fileService: FileService,
    private menuService: NbMenuService,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private fb: FormBuilder) { 
      
    this.itemDetailForm = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(1)]],
      itemDescription: ['', [Validators.required, Validators.minLength(1)]],
      itemPrice: ['', [Validators.required, Validators.min(0.00001)]],
      itemTax: ['', [Validators.required, Validators.min(0.00001)]],
      thumbnail: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  addItem() {
    if (this.itemDetailForm.controls.itemName.invalid) return;
    if (this.itemDetailForm.controls.itemDescription.invalid) return;
    if (this.itemDetailForm.controls.itemPrice.invalid) return;
    if (this.itemDetailForm.controls.itemTax.invalid) return;

    if (this.linkThunbnail == undefined || this.linkThunbnail == null)
      this.linkThunbnail = '';
    this.api_service.addItem(this.category_id, this.itemDetailForm.value.itemName,
      this.itemDetailForm.value.itemDescription, this.itemDetailForm.value.itemPrice, 
      this.itemDetailForm.value.itemTax, this.linkThunbnail).subscribe(
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

  onChange(x) {
    let self = this;
    this.imageUploaded = false;
    this.imageUploadFailed = false;
    if (x.target.files.length == 0) {
      return;
    }
    
    this.tempThumbnail = x.target.files[0];
    let image_name = this.tempThumbnail['name'];

    var formData = new FormData();
    formData.append("photo", this.tempThumbnail, image_name);
    formData.append("path", "uploads/");

    this.fileService.addFile(formData).subscribe(
      (event) => {
          if (event.status == "true") {
            self.linkThunbnail = event['URL'];
            console.log(self.linkThunbnail);
            self.imageUploaded = true;
          } else {
            this.imageUploadFailed = true;
          }
        },
        (err)=>{
          console.log(err);
          this.imageUploadFailed = true;
        },
        ()=>{
          console.log("Image upload has done!");
        }
      );
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
  }

}
