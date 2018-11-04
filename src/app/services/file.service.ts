import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/internal/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class FileService {

//   public FileUrl = 'https://orders.paranoidfan.com:3000/api/fileupload';
  public FileUrl = 'https://api.paranoidfan.com/api/sdk/upload';
  constructor(private http:HttpClient){}

  getFiles(){
     return this.http.get<Array<object>>(this.FileUrl);
  }

  addFile(data){
    const httpOptions = {
        headers: new HttpHeaders({
            "Authkey": "BGta}*X2V1M6SCta}*XTV1E8"
        })
    };

    return this.http
    .post<any>(this.FileUrl, data, httpOptions)
    .pipe(
      tap((res: any) => this.log(`request is ok`)),
      catchError(this.handleError<any>('File upload'))
    );
  }
  
  deleteFile(filename){
      return this.http.delete(this.FileUrl+filename);
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
