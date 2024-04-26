import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Provider } from '../../models/provider';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url!: string;

  // Inicializa o serviço com o HttpClient e define a URL do backend.
  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:5000';
  }

  // Envia uma solicitação HTTP POST para adicionar um novo produto e transforma o produto em um FORMDATA.
  postProduct(product: Product): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('nome', product.nome);
    formData.append('quantidade', product.quantidade.toString());
    formData.append('recipiente', product.recipiente.toString());
    formData.append('valor', product.valor.toString());
    formData.append('fornecedor', product.fornecedor);

    let headers = new HttpHeaders().set('accept', '*/*');

    return this.http.post<Product>(`${this.url}/product`, formData, {
      headers: headers,
    });
  }

  // Envia uma solicitação HTTP PUT para atualizar um produto existente e transforma o produto em um FORMDATA.
  putProduct(id: number, product: Product): Observable<Product> {
    const formData = new FormData();
    formData.append('nome', product.nome);
    formData.append('quantidade', product.quantidade.toString());
    formData.append('recipiente', product.recipiente.toString());
    formData.append('valor', product.valor.toString());
    formData.append('fornecedor', product.fornecedor.toString());

    return this.http.put<Product>(`${this.url}/product/?id=${id}`, formData);
  }

  // Obtém todos os produtos do backend.
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  // Obtém um produto específico com o ID fornecido do backend.
  getId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/product/?id=${id}`);
  }

  // Exclui um produto específico com o ID fornecido do backend.
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product/?id=${id}`);
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.url}/providers`);
  }
}
