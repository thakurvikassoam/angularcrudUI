import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Post } from './post';
    
@Injectable({
  providedIn: 'root'
})
export class PostService {
    
  private apiURL = "https://localhost:44328/";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Post[]> {    
    return this.httpClient.get<Post[]>(this.apiURL + 'api/Home/GetEmployee')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(post: any): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + 'api/Home/AddEmployee', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + 'api/Home/GetEmployeeByID/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(post: any): Observable<Post> {
    debugger
    return this.httpClient.put<Post>(this.apiURL + 'api/Home/UpdateEmployee/', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: any){
    debugger
    return this.httpClient.post<Post>(this.apiURL + 'api/Home/DeleteEmployee/',id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}