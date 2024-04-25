import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  url!: string;

  // Inicializa o serviço com o HttpClient e define a URL do backend.
  constructor(private http: HttpClient) {
    this.url = 'http://127.0.0.1:5000';
  }

  buscarCep(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  // Envia uma solicitação HTTP POST para adicionar um novo produto e transforma o produto em um FORMDATA.
  postProvider(provider: Provider): Observable<Provider> {
    console.log({ provider });
    const formData: FormData = new FormData();

    formData.append('nome', provider.nome);

    // Verifica se as propriedades não são undefined antes de adicioná-las ao FormData
    if (provider.cnpj) {
      formData.append('cnpj', provider.cnpj.toString());
    }
    if (provider.cep) {
      formData.append('cep', provider.cep.toString());
    }
    if (provider.cidade) {
      formData.append('cidade', provider.cidade.toString());
    }
    if (provider.uf) {
      formData.append('uf', provider.uf.toString());
    }
    let headers = new HttpHeaders().set('accept', '*/*');
    return this.http.post<Provider>(`${this.url}/provider`, formData, {
      headers: headers,
    });
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.url}/providers`);
  }
}
