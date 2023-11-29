import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  url!: string;
 

  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:5000';
  }

  postProduct(product: Product): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('nome', product.nome);
    formData.append('quantidade', product.quantidade.toString());
    formData.append('recipiente', product.recipiente.toString());
    formData.append('valor', product.valor.toString());

    let headers = new HttpHeaders().set('accept', '*/*');

    return this.http.post<Product>(`${this.url}/product`, formData, { headers: headers });
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
