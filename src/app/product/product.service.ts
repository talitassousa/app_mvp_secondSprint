import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  url!: string;
 

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:5000';
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/product`, product);
  }

  putProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/product/?id=${id}`, product);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }
  getId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/product/?id=${id}`);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product/?id=${id}`);
  }
}
