import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddMenuModalComponent } from '../menu/add-menu-modal/add-menu-modal.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Utils } from '../../common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  settings = {
    mode: 'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      first_name: {
        title: 'First Name',
        type: 'string',
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
        sort: true,
      },
      password: {
        title: 'Password',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'html',
        valuePrepareFunction: (role) => {
          if (role == 0) return 'Client';
          if (role == 1) return 'Manager';
          if (role == 2) return 'Front Desk';
        },
        editor: {
          type: 'list',
          config: {
            list: [
              {title: 'Manager', value: '1'},
              {title: 'Front Desk', value: '2'}
            ]
          }
        }
      },
      created_at: {
        title: 'Created At',
        type: 'string',
        editable: false,
        addable: false,
        valuePrepareFunction: (timestamp) => {
          var date = new Date(timestamp * 1000);
          var mm = date.getMonth()+1;
          var dd = date.getDate();
          var yy = date.getFullYear();
          return mm + "/" + dd + "/" + yy;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  currentUser: any;

  constructor(private api_service: ApiService, 
              private toastrService: ToastrService,
              private cookieService: CookieService,
              private router: Router) { 
    if (!(this.cookieService.check('user') && this.cookieService.get('user') != '')) {
      var redirect = '/auth/login';
      this.router.navigateByUrl(redirect);
      return;
    } else {
      this.currentUser = Utils.decodeJwt(this.cookieService.get('user'));
    }

    this.api_service.getChildren(this.currentUser.restaurant_id).subscribe(
      res => {
          console.log(res);
          if (res) {
              if (!res.err) {
                this.source.load(res.response);
              } else {
                  this.toastrService.error('Cannot fetch users!');
              }
          } else {
              this.toastrService.error('Cannot fetch users!');
          }
      });
  }

  ngOnInit() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete???')) {
      this.api_service.deleteUser(event.data['id']).subscribe(
        res => {
            console.log(res);
            if (res) {
                if (!res.err) {
                  this.toastrService.success('Successfully deleted!');
                  event.confirm.resolve();
                } else {
                    this.toastrService.error(res.msg);
                    event.confirm.reject();
                }
            } else {
                this.toastrService.error('"Delete user" was failed!');
                event.confirm.reject();
            }
        });

    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    if (window.confirm('Are you sure you want to save changes ?')) {
      var username = event.newData['username'];
      if (username === '') {
        this.toastrService.error('Username field is empty!');
        event.confirm.reject();
        return;
      }

      var first_name = event.newData['first_name'];
      if (first_name === '') {
        this.toastrService.error('First Name field is empty!');
        event.confirm.reject();
        return;
      }

      var last_name = event.newData['last_name'];
      if (last_name === '') {
        this.toastrService.error('Last Name field is empty!');
        event.confirm.reject();
        return;
      }

      var email = event.newData['email'];
      if (email === '') {
        this.toastrService.error('Email field is empty!');
        event.confirm.reject();
        return;
      }

      var password = event.newData['password'];
      if (password === '') {
        this.toastrService.error('Password field is empty!');
        event.confirm.reject();
        return;
      }

      var role = event.newData['role'];
      if (role === '') {
        this.toastrService.error('Role field is empty!');
        event.confirm.reject();
        return;
      }

      console.log(event.newData);
      this.api_service.updateUser(event.newData).subscribe(
        res => {
            console.log(res);
            if (res) {
                if (!res.err) {
                  this.toastrService.success('Successfully updated!');
                  event.confirm.resolve();
                } else {
                    this.toastrService.error(res.msg);
                    event.confirm.reject();
                }
            } else {
                this.toastrService.error('Update was failed!');
                event.confirm.reject();
            }
        });

    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create this user?')) {
      var username = event.newData['username'];
      if (username === '') {
        this.toastrService.error('Username field is empty!');
        event.confirm.reject();
        return;
      }

      var first_name = event.newData['first_name'];
      if (first_name === '') {
        this.toastrService.error('First Name field is empty!');
        event.confirm.reject();
        return;
      }

      var last_name = event.newData['last_name'];
      if (last_name === '') {
        this.toastrService.error('Last Name field is empty!');
        event.confirm.reject();
        return;
      }

      var email = event.newData['email'];
      if (email === '') {
        this.toastrService.error('Email field is empty!');
        event.confirm.reject();
        return;
      }

      var password = event.newData['password'];
      if (password === '') {
        this.toastrService.error('Password field is empty!');
        event.confirm.reject();
        return;
      }

      var role = event.newData['role'];
      if (role === '') {
        this.toastrService.error('Role field is empty!');
        event.confirm.reject();
        return;
      }

      this.api_service.registerUser(event.newData).subscribe(
        res => {
            console.log(res);
            if (res) {
                if (!res.err) {
                  this.toastrService.success('Successfully registered!');
                  event.confirm.resolve();
                } else {
                    this.toastrService.error(res.msg);
                    event.confirm.reject();
                }
            } else {
                this.toastrService.error('Registration was failed!');
                event.confirm.reject();
            }
        });

    } else {
      event.confirm.reject();
    }
  }

}
