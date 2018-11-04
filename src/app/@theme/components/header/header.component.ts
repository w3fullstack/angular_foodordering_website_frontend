import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '../../../@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { CookieService } from 'ngx-cookie-service';
import { Utils } from '../../../common';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  logoutAvailable: boolean = false;
  userMenu = [{ title: 'Log out' }];

  

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit() {
    var _this1 = this;
    this.logoutAvailable = false;
    this.user = Utils.decodeJwt(this.cookieService.get('user'));
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
    this.logoutAvailable = true;
  }

  onItemSelection( title ) {
    // console.log(title);
    if (title === 'Log out') {
      if (!this.logoutAvailable) return;

      console.log('log out ~~~~~~~~~~~~~~');
      this.cookieService.delete('user', '/');
      var _this = this;
      setTimeout(function() {
        _this.router.navigate(['/auth/login'], { replaceUrl : true });
      }, 1000);
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
