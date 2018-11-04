import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { AddMenuModalComponent } from './add-menu-modal/add-menu-modal.component';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import { AddCagetoryModalComponent } from './add-cagetory-modal/add-cagetory-modal.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Utils } from '../../common';
import { NbMenuService, NbMenuItem } from '../../@nebular/theme/components/menu/menu.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FileService } from '../../services/file.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  isPending: boolean = true;
  mnu_category: any;
  mnu_item: any;
  has_items: boolean = true;
  self: any;
  currentUser: any;

  myMenu: any = '';

  category_id: any = -1;
  item_id: any = -1;

  itemDetailForm: any;
  menuSubscription: any;

  imageUploaded: boolean = true;
  imageUploadFailed: boolean = false;
  uploadPercent: any = 100;
  tempThumbnail: any;
  linkThunbnail: any;

  uploader: any;

  constructor(private modalService: NgbModal, 
    private api_service: ApiService,
    private menuService: NbMenuService,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private fileService: FileService,
    private fb: FormBuilder) { 
      this.self = this;

      this.mnu_category = [];
      this.mnu_item =[];

      if (!(this.cookieService.check('user') && this.cookieService.get('user') != '')) {
        var redirect = '/auth/login';
        this.router.navigateByUrl(redirect);
        return;
      } else {
        this.currentUser = Utils.decodeJwt(this.cookieService.get('user'));
      }
      
      this.fetchMenu();

      this.itemDetailForm = this.fb.group({
        itemName: ['', [Validators.required, Validators.minLength(1)]],
        itemDescription: ['', [Validators.required, Validators.minLength(1)]],
        itemPrice: ['', [Validators.required, Validators.minLength(1)]],
        itemTax: ['', [Validators.required, Validators.minLength(1)]],
        thumbnail: ['', [Validators.required, Validators.minLength(1)]],
      });

      this.uploader = new FileUploader({
        url: `https://api.paranoidfan.com/api/sdk/upload`,
        isHTML5: true,
        autoUpload: true,
        headers: [{
            name: 'Authkey',
            value: 'BGta}*X2V1M6SCta}*XTV1E8'
        }]
      });

      this.uploader.onCompleteItem = function (item, response, status, headers) {
        const res = JSON.parse(response);
        if (item.alias === 'photo') {
          console.log(res.URL);
        }
        // console.log(item, res, status);
      };
    }
  
    onItemSelection(event) {
      let item = event;

      if (item.is_menu) {
        console.log('menu clicked');
        return;
      }
      if (item.is_category) {
        console.log('category clicked');
        this.category_id = item.category_id;
        this.item_id = -1;
        this.fetchItems();
        return;
      }
      if (item.is_item) {
        console.log('item clicked');
        this.item_id = item.item_id;
        this.linkThunbnail = item.photo;
        this.itemDetailForm.setValue({itemName: item.title, itemDescription: item.description, itemPrice: item.price, itemTax: item.tax, thumbnail: ''});
        this.imageUploaded = true;
        this.imageUploadFailed = false;
      }
    }

  ngOnInit() {

  }

  ngOnDestroy() {
    console.log('~~~~~~~ Destroy xxxxxxxxxxxxxx');
  }

  fetchMenu() {
    if (this.myMenu !== null)
      this.myMenu = null;
    this.category_id = -1;
    this.item_id = -1;

    let restaurat_id = this.currentUser.restaurant.id;
    this.api_service.getMenu(restaurat_id).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                if (res.response !== null) {
                  let menu = res.response;
                  this.myMenu = menu;
                  this.fetchCategory(this.myMenu.id);
                }
              } else {
                this.toastrService.error(res.msg);
              }
          } else {
              this.toastrService.error('Cannot fetch menu!');
          }
      });
  }

  fetchCategory(event: any) {
    let menu_id = event;
    this.category_id = -1;
    this.item_id = -1;

    this.api_service.getCategory(menu_id).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                if (res.response !== null) {
                  this.mnu_category = [];
                  for (let iterCategory in res.response) {
                    this.mnu_category.push({
                      title: res.response[iterCategory].name, 
                      icon: 'nb-grid-a-outline', 
                      is_category: true, 
                      menu_id: menu_id, 
                      thumbnail: res.response[iterCategory].photo,
                      category_id: res.response[iterCategory].id,
                      is_selected: false,
                    });
                  }
                }
              } else {
                this.toastrService.error(res.msg);
              }
          } else {
              this.toastrService.error('Cannot fetch menu!');
          }
      });
  }

  fetchItems() {
    this.item_id = -1;
    this.api_service.getItems(this.category_id).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                if (res.response !== null) {
                  this.mnu_item = [];
                  for (var item of res.response) {
                    this.mnu_item.push({
                      title: item.name, 
                      icon: 'nb-arrow-thin-right', 
                      is_item: true, 
                      item_id: item.id, 
                      menu_id: this.myMenu.id, 
                      category_id: this.category_id,
                      thumbnail: item.photo,
                      description: item.description, 
                      price: item.price, 
                      tax: item.tax,
                      is_selected: false,
                    });
                  }
                }
              } else {
                this.toastrService.error(res.msg);
              }
          } else {
              this.toastrService.error('Cannot fetch items!');
          }
      });
  }

  addCategory() {
    var self = this;
    const activeModal = this.modalService.open(AddCagetoryModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.close = function() {
      self.fetchCategory(self.myMenu.id);
    };
    activeModal.componentInstance.menu_id = this.myMenu.id;
  }

  addMenu() {
    var self = this;
    const activeModal = this.modalService.open(AddMenuModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.currentUser = this.currentUser;
    activeModal.close = function() {
      self.fetchMenu();
    };
    activeModal.componentInstance.menu_id = this.myMenu.id;
    activeModal.componentInstance.category_id = this.category_id;
  }

  addItem() {
    const activeModal = this.modalService.open(AddItemModalComponent, { size: 'lg', container: 'nb-layout' });
    var self = this;
    activeModal.close = function() {
      self.fetchItems();
    };
    activeModal.componentInstance.category_id = this.category_id;
  }

  onDelete(event) {
    var self = this;
    if (event.is_category) {
      this.api_service.deleteCategory(event.category_id).subscribe(
        res => {
            console.log(res);
            if (res) {
                if (!res.err) {
                  this.toastrService.success('Deleted successfully!');  
                  self.fetchCategory(event.menu_id);
                } else {
                  this.toastrService.error(res.msg);
                }
            } else {
                this.toastrService.error('Cannot fetch items!');
            }
        });
    } else if (event.is_item) {
      this.api_service.deleteItem(event.item_id).subscribe(
        res => {
            console.log(res);
            if (res) {
                if (!res.err) {
                  this.toastrService.success('Deleted successfully!');  
                  self.fetchItems();
                } else {
                  this.toastrService.error(res.msg);
                }
            } else {
                this.toastrService.error('Cannot fetch items!');
            }
        });
    }
  }

  onEdit(event) {
    console.log(event.thumbnail);
    var self = this;
    if (event.is_category) {
      this.api_service.updateCategory(event.category_id, event.menu_id, event.name, event.thumbnail).subscribe(
        res => {
            console.log(res);
            if (res) {
                if (!res.err) {
                  this.toastrService.success('Updated successfully!');  
                  self.fetchCategory(event.menu_id);
                } else {
                  this.toastrService.error(res.msg);
                }
            } else {
                this.toastrService.error('Cannot fetch items!');
            }
        });
    } else if (event.is_item) {
      this.api_service.updateItem(event.item_id, event.category_id, event.name, event.description, event.price, event.tax, event.thumbnail).subscribe(
        res => {
            console.log(res);
            if (res) {
                if (!res.err) {
                  this.toastrService.success('Updated successfully!');  
                  self.fetchItems();
                } else {
                  this.toastrService.error(res.msg);
                }
            } else {
                this.toastrService.error('Cannot fetch items!');
            }
        });
    }
  }
  submitChanges() {
    if (this.itemDetailForm.controls.itemName.invalid) return;
    if (this.itemDetailForm.controls.itemDescription.invalid) return;
    if (this.itemDetailForm.controls.itemPrice.invalid) return;
    if (this.itemDetailForm.controls.itemTax.invalid) return;
    if (this.linkThunbnail == undefined || this.linkThunbnail == null)
      this.linkThunbnail = '';
    this.api_service.updateItem(this.item_id, this.category_id, this.itemDetailForm.value.itemName, this.itemDetailForm.value.itemDescription, this.itemDetailForm.value.itemPrice, this.itemDetailForm.value.itemTax, this.linkThunbnail).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                this.toastrService.success('Updated successfully!');  
                for (var item in this.mnu_item) {
                  if (this.mnu_item[item].item_id == this.item_id) {
                    this.mnu_item[item]={title: this.itemDetailForm.value.itemName, is_item: true, item_id: this.item_id, menu_id: this.myMenu.id, category_id: this.category_id, icon: 'nb-arrow-thin-right', 
                      thumbnail:this.linkThunbnail, description: this.itemDetailForm.value.itemDescription, price: this.itemDetailForm.value.itemPrice, tax: this.itemDetailForm.value.itemTax };
                    return;
                  }
                }
              } else {
                this.toastrService.error(res.msg);
              }
          } else {
              this.toastrService.error('Cannot fetch items!');
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

}
