import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'add-cagetory-modal',
  templateUrl: './add-cagetory-modal.component.html',
  styleUrls: ['./add-cagetory-modal.component.scss']
})
export class AddCagetoryModalComponent implements OnInit {

  @Input() menu_id;

  addCategoryForm: any;

  imageUploaded: boolean = false;
  imageUploadFailed: boolean = false;
  uploadPercent: any = 100;
  tempThumbnail: any;
  linkThunbnail: any = '';

  constructor(private activeModal: NgbActiveModal,
    private api_service: ApiService,
    private fileService: FileService,
    private toastrService: ToastrService, private fb: FormBuilder)
    { 
      this.addCategoryForm = this.fb.group({
        newCategoryName: ['', [Validators.required, Validators.minLength(1)]],
        thumbnail: ['', [Validators.required, Validators.minLength(1)]],
      });
    } 

  addCategory() {
    if (this.addCategoryForm.controls.newCategoryName.invalid) return;
    if (this.linkThunbnail == undefined || this.linkThunbnail == null)
      this.linkThunbnail = '';

    this.api_service.addCategory(this.addCategoryForm.value.newCategoryName, this.menu_id, this.linkThunbnail).subscribe(
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
