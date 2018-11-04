import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FileService } from '../../services/file.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'custom-edit',
  templateUrl: './custom-edit.component.html',
  styleUrls: ['./custom-edit.component.scss']
})
export class CustomEditComponent implements OnInit {

  @Input() title: any;
  @Input() linkThunbnail: any = '';
  @Input() content: any;
  @Input() hasFileInput: boolean = false;

  editForm: FormGroup;

  imageUploaded: boolean = true;
  imageUploadFailed: boolean = false;
  uploadPercent: any = 100;
  tempThumbnail: any;  

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private fileService: FileService) {     
    
  }

  ngOnInit() {
    if (this.hasFileInput) {
      this.editForm = this.fb.group({
        newName: ['', [Validators.required, Validators.minLength(1)]],
        newThumbnail: ['', [Validators.required, Validators.minLength(1)]],
      });
      this.editForm.setValue({newName: this.content, newThumbnail: ''});
    } else {
      this.editForm = this.fb.group({
        newName: ['', [Validators.required, Validators.minLength(1)]],
      });
      this.editForm.setValue({newName: this.content});
    }    
  }

  onClickOk() {
    if (this.editForm.controls.newName.valid) {
      if (this.linkThunbnail == undefined || this.linkThunbnail == null)
        this.linkThunbnail = '';
        
      if (this.hasFileInput) {
        if (this.imageUploaded) {
          this.activeModal.close({newName: this.editForm.value.newName, newThumbnail: this.linkThunbnail});
          this.closeModal();
        }
      } else {
        this.activeModal.close({newName: this.editForm.value.newName});
        this.closeModal();
      }
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  onChange(x) {
    let self = this;
    this.imageUploaded = false;
    this.imageUploadFailed = false;
    if (x.target.files.length == 0) {
      return;
    }
    
    this.tempThumbnail = x.target.files[0];
    var formData = new FormData();
    let image_name = this.tempThumbnail['name'];
    let image_file_extensions = ['.jpg', '.png', '.gif', '.jpeg', ]
    formData.append("file",this.tempThumbnail, image_name);
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
