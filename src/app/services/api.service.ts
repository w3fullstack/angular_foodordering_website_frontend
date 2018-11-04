import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/internal/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL : any = environment.SERVER_URL + '/api/';
  apiEndPoints: any;

  constructor(private http: HttpClient) {
    this.apiEndPoints = {
      // user
      login: 'user/login',
      register: 'user/register',
      fetchAllUsers: 'user/fetch_all',
      updateUser: 'user/update',
      deleteUser: 'user/delete/:user_id',
      getChildren: 'user/getChildren/:restaurant_id',

      // restaurant
      addRestaurant: 'restaurant/add',
      getRestaurant: 'restaurant/get/:restaurant_id',
      updateRestaurantStatus: 'restaurant/updateStatus/:restaurant_id/:status',
      updateRestaurantPrepareTime: 'restaurant/updatePrepareTime/:restaurant_id/:prepare_time',
      addBankAccount: 'restaurant/addBank',

      // menu
      addMenu: 'menu/add',
      getMenu: 'menu/get/:restaurant_id',

      // category
      addCategory: 'category/add',
      getCategory: 'category/get/:menu_id',
      updateCategory: 'category/update',
      deleteCategory: 'category/delete/:category_id',

      // items
      addItem: 'items/add',
      getItems: 'items/get/:category_id',
      updateItem: 'items/update',
      deleteItem: 'items/delete/:item_id',
      getStatistics: 'items/statistic/:restaurant_id/:duration',
      getSoldItems: 'items/sold/:restaurant_id/:duration',

      // order
      getOrderAll: 'order/get/:restaurant_id',
      getPendingOrders: 'order/get/pending/:restaurant_id',
      getCompletedOrders: 'order/get/completed/:restaurant_id',
      getOrderByID: 'order/get/:order_id',
      addOrder: 'order/add',
      updateOrderStatus: 'order/update/:order_id/:status',

      // add customer
      addCustomer: 'customer/add',
    };
    for (let key in this.apiEndPoints) {
      this.apiEndPoints[key] = this.BASE_URL + this.apiEndPoints[key];
    }
  }

  protected getHeaders() : { headers: HttpHeaders } {
    return {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })};
  }

  signInUser(username: any, password: any): Observable<any> {
    var data = {
      username: username,
      password: password,
    }
    console.log(this.apiEndPoints.login);
    return this.http
    .post<any>(this.apiEndPoints.login, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Sign in'))
    );
  }

  fetchAllUsers(): Observable<any> {
    console.log(this.apiEndPoints.fetchAllUsers);
    return this.http
    .get<any>(this.apiEndPoints.fetchAllUsers, this.getHeaders())
    .pipe(
      tap(_ => this.log(`fetched recent messaged users`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }
  
  registerUser(user: any): Observable<any> {
    var data = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      location: user.location,
      role: user.role,
    }
    console.log(this.apiEndPoints.register);
    return this.http
    .post<any>(this.apiEndPoints.register, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Register'))
    );
  }
  
  updateUser(user: any): Observable<any> {
    var data = {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      location: user.location,
      role: user.role,
    }
    console.log(this.apiEndPoints.updateUser);
    return this.http
    .post<any>(this.apiEndPoints.updateUser, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Register'))
    );
  }

  deleteUser(id: any): Observable<any> {
    let url = this.apiEndPoints.deleteUser.replace(':user_id', id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  getChildren(restaurant_id: any): Observable<any> {
    let url = this.apiEndPoints.getChildren.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('getChildren'))
    );
  }

  addRestaurant(client_id: any, manager_id: any, name: any): Observable<any> {
    var data = { client_id: client_id, manager_id: manager_id, name: name};
    console.log(this.apiEndPoints.addRestaurant);
    return this.http
    .post<any>(this.apiEndPoints.addRestaurant, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Add Restaurant'))
    );
  }

  getRestaurant(restaurant_id: any): Observable<any> {
    let url = this.apiEndPoints.getRestaurant.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Get Restaurant'))
    );
  }

  updateRestaurantStatus(restaurant_id, status): Observable<any> {
    let url = this.apiEndPoints.updateRestaurantStatus.replace(':restaurant_id', restaurant_id);
    url = url.replace(':status', status);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`Updated restaurant's status`)),
      catchError(this.handleError<any>(`Update restaurant's status`))
    );
  }

  updateRestaurantPrepareTime(restaurant_id, prepare_time): Observable<any> {
    let url = this.apiEndPoints.updateRestaurantPrepareTime.replace(':restaurant_id', restaurant_id);
    url = url.replace(':prepare_time', prepare_time);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`Updated restaurant's preparation time`)),
      catchError(this.handleError<any>(`Update restaurant's preparation time`))
    );
  }

  addBankAccount(restaurant_id: any, account_number : any, routing_number: any, account_holder_name: any): Observable<any> {
    var data = {
      restaurant_id: restaurant_id,
      routing_number: routing_number,
      account_number: account_number,
      account_holder_name: account_holder_name,
    }
    console.log(this.apiEndPoints.addBankAccount);
    return this.http
    .post<any>(this.apiEndPoints.addBankAccount, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Add Bank Account'))
    );
  }

  getMenu(restaurant_id): Observable<any> {
    let url = this.apiEndPoints.getMenu.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`fetched recent messaged users`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }

  addMenu(name: any, restaurant_id: any): Observable<any> {
    var data = {
      menu_name: name,
      restaurant_id: restaurant_id,
    }
    console.log(this.apiEndPoints.addMenu);
    return this.http
    .post<any>(this.apiEndPoints.addMenu, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Sign in'))
    );
  }

  getCategory(menu_id): Observable<any> {
    let url = this.apiEndPoints.getCategory.replace(':menu_id', menu_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`fetched recent messaged users`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }

  addCategory(name: any, menu_id: any, thumbnail: any): Observable<any> {
    var data = {
      category_name: name,
      menu_id: menu_id,
      photo: thumbnail,
      is_deleted: false,
    }
    console.log(this.apiEndPoints.addCategory);
    return this.http
    .post<any>(this.apiEndPoints.addCategory, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Sign in'))
    );
  }

  updateCategory(category_id: any, menu_id: any, name: any, thumbnail: any, is_deleted: number = 0): Observable<any> {
    var data = {
      category_id: category_id,
      menu_id: menu_id,
      category_name: name,
      photo: thumbnail,
      is_deleted: is_deleted
    }
    console.log(this.apiEndPoints.updateCategory);
    return this.http
    .post<any>(this.apiEndPoints.updateCategory, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Update Category'))
    );
  }

  deleteCategory(category_id: any): Observable<any> {
    let url = this.apiEndPoints.deleteCategory.replace(':category_id', category_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Update Category'))
    );
  }

  getItems(category_id): Observable<any> {
    let url = this.apiEndPoints.getItems.replace(':category_id', category_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`fetched recent messaged users`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }

  addItem(category_id: any, name: any, description, price: any, tax: any, thumbnail: any): Observable<any> {
    var data = {
      category_id: category_id,
      name: name,
      description: description,
      price: price,
      tax: tax,
      photo: thumbnail,
    }
    console.log(this.apiEndPoints.addItem);
    return this.http
    .post<any>(this.apiEndPoints.addItem, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Sign in'))
    );
  }

  updateItem(item_id: any, category_id: any, name: any, description: any, price: any, tax: any, thumbnail: any, is_deleted: number = 0): Observable<any> {
    var data = {
      item_id: item_id,
      category_id: category_id,
      name: name,
      description: description,
      price: price,
      tax: tax,
      thumbnail: thumbnail,
      is_deleted: is_deleted
    }
    console.log(this.apiEndPoints.updateItem);
    return this.http
    .post<any>(this.apiEndPoints.updateItem, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Update Item'))
    );
  }
  
  deleteItem(item_id: any): Observable<any> {
    let url = this.apiEndPoints.deleteItem.replace(':item_id', item_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`deleteItem`)),
      catchError(this.handleError<any>(`item was deleted`))
    );
  }

  getStatistics(restaurant_id, duration: any): Observable<any> {
    let url = this.apiEndPoints.getStatistics.replace(':duration', duration);
    url = url.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`getStatistics`)),
      catchError(this.handleError<any>(`fetched statistics`))
    );
  }

  getSoldItems(restaurant_id, duration: any): Observable<any> {
    let url = this.apiEndPoints.getSoldItems.replace(':duration', duration);
    url = url.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`getSoldItems`)),
      catchError(this.handleError<any>(`fetched sold items`))
    );
  }

  getOrderAll(restaurant_id: any): Observable<any> {
    let url = this.apiEndPoints.getOrderAll.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`getOrderAll`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }

  getPendingOrders(restaurant_id: any): Observable<any> {
    let url = this.apiEndPoints.getPendingOrders.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`getPendingOrders`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }

  getCompletedOrders(restaurant_id: any): Observable<any> {
    let url = this.apiEndPoints.getCompletedOrders.replace(':restaurant_id', restaurant_id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`getCompletedOrders`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }
    
  getOrderByID(id: any): Observable<any> {
    let url = this.apiEndPoints.getOrderByID.replace(':order_id', id);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`getOrderByID`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }
      
  updateOrderStatus(id: any, status: any): Observable<any> {
    let url = this.apiEndPoints.updateOrderStatus.replace(':order_id', id);
    url = url.replace(':status', status);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`updateOrderStatus`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }

  refundedOrder(id: any): Observable<any> {
    let url = this.apiEndPoints.updateOrderStatus.replace(':order_id', id);
    url = url.replace(':status', 3);
    console.log(url);
    return this.http
    .get<any>(url, this.getHeaders())
    .pipe(
      tap(_ => this.log(`refundedOrder`)),
      catchError(this.handleError<any>(`fetched recent messaged users`))
    );
  }

  fileUpload(formdata: any) {
    console.log('uploading file....');
    let req = new HttpRequest('POST','http://localhost:3000/api/fileupload', formdata, {
      reportProgress:true
    });
    return this.http.request(req);
  };

  // Customer
  addCustomer(user_id: any, name: any, email: any, token: any): Observable<any> {
    var data = {
      user_id: user_id,
      name: name,
      email: email,
      token: token,
    }
    console.log(this.apiEndPoints.addCustomer);
    return this.http
    .post<any>(this.apiEndPoints.addCustomer, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('Add Customer'))
    );
  }
  
  // Error handling
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
