import { Component, OnInit } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '../../@nebular/theme';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Utils } from '../../common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  themeSubscription: any;
  chartOptions: any = {};
  colors: any;
  echarts: any;

  currentUser: any;

  active_tab_item: number = 0;
  topSellingItems: any;
  totalPrice: any = 0;
  allSoldItemsByDate: any;

  constructor(private apiService: ApiService, private theme: NbThemeService,
    private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    if (!(this.cookieService.check('user') && this.cookieService.get('user') != '')) {
      var redirect = '/auth/login';
      this.router.navigateByUrl(redirect);
      return;
    } else {
      this.currentUser = Utils.decodeJwt(this.cookieService.get('user'));
    }
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.echarts = config.variables.echarts;

      this.getStatistic();
      this.getSoldItems();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  onClickTabItem(index: number) {
    this.active_tab_item = index;
    this.getStatistic();
    this.getSoldItems();
  }

  getStatistic() {
    this.apiService.getStatistics(this.currentUser.restaurant.id, this.active_tab_item == 0 ? 7 : 30).subscribe(
      res => {
        this.topSellingItems = res.response;
        if (this.topSellingItems.length > 6) {
          this.topSellingItems.slice(6, this.topSellingItems.length - 6);
        }
      }
    );
  }

  getSoldItems() {
    let duration = this.active_tab_item == 0 ? 7 : 30;
    this.apiService.getSoldItems(this.currentUser.restaurant.id, duration).subscribe(
      res => {
        this.allSoldItemsByDate = [];
        for (let i = 0 ; i < duration ; i++) {
          let date = new Date(Date.now() - i * 24 * 3600 * 1000);
          let strDate = (date.getMonth()+1) + "/" + date.getDate();
          this.allSoldItemsByDate.unshift({ date: strDate, price: 0 });
        }
        console.log(this.allSoldItemsByDate);
        
        let totalPrice = 0;
        for (let item of res.response) {
          let date = new Date(item.created_at*1000);
          let strDate = (date.getMonth()+1) + "/" + date.getDate();
          let price = item.amounts * item.price * (1 + item.tax/100);
          totalPrice += price;

          let index = this.allSoldItemsByDate.findIndex(x => x.date === strDate);
          if (index > -1) {
            this.allSoldItemsByDate[index].price += price;
          }
        }
        this.totalPrice = totalPrice.toFixed(2);
        this.chartOptions = {
          backgroundColor: this.echarts.bg,
          color: [this.colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: this.echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: this.echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: this.echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: this.echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: this.echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: 'Sold amount',
              type: 'bar',
              barWidth: '60%',
              data: [],
            },
          ],
        };
        for (let item of this.allSoldItemsByDate) {
          this.chartOptions.xAxis[0].data.push(item.date);
          this.chartOptions.series[0].data.push(item.price.toFixed(2));
        }
      }
    );
  }
}
