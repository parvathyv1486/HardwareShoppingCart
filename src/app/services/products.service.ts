import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getProducts(page_number,pageSize) : Observable<Product>{
    return this._http.get<Product>('http://localhost:8080/products?_page=' + page_number + '&_limit=' + pageSize).pipe(
      map((response) => response),
      catchError(this.handleError));
  }

  getProductsByName(name) : Observable<Product>{
    return this._http.get<Product>('http://localhost:8080/products?name_like=' + name).pipe(
      map((response) => response),
      catchError(this.handleError));
  }

  getProductById(productId) : Observable<any>{
    return this._http.get('http://localhost:8080/products/' + productId ).pipe(
      map((response) => response),
      catchError(this.handleError));
  }

  addProduct(param) :  Observable<any>{
    return this._http.post('http://localhost:8080/products/' ,param ).pipe(
      map((response) => response),
      catchError(this.handleError));
  }

  updateProduct(param,id) :  Observable<any>{
    return this._http.put('http://localhost:8080/products/' + id ,param ).pipe(
      map((response) => response),
      catchError(this.handleError));
  }

  deleteProduct(id) :  Observable<any>{
    return this._http.delete('http://localhost:8080/products/' + id  ).pipe(
      map((response) => response),
      catchError(this.handleError));
  }

  placeOrder(param,user_id): Observable<any>{
    return this._http.put('http://localhost:8080/users/' + user_id ,param ).pipe(
      map((response) => response),
      catchError(this.handleError));
  }

  private handleError(error) {
    console.error(error);
    return throwError(error || 'Product error');
  }
}
