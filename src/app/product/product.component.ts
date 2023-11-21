import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-home',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  product = new Product();

  editingMode = false;
  editingProduct: Product = new Product();

  message!: string;
  action!: string;

  form: any;

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private MessageService: MessageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getId(id);
    }
    this.getAll();
  }

  // Seu componente Angular
  editProduct(id: number, product: Product) {
    this.editingMode = true;

    // Lógica para obter as informações do produto (pode ser uma chamada HTTP)
    this.productService.getId(id).subscribe({
      next: (response) => {
        this.editingProduct = response;

        this.product.id = this.editingProduct.id;
        this.product.nome = this.editingProduct.nome;
        this.product.recipiente = this.editingProduct.recipiente;
        this.product.quantidade = this.editingProduct.quantidade;
        this.product.valor = this.editingProduct.valor;
      },
      error: (err) => {
        console.log(err);
        alert('Erro ao tentar obter informações do produto para edição!');
      },
    });
  }

  postPut() {
    if (this.editingMode) {
      this.put(this.product.id, this.product);
    } else {
      this.post(this.product);
    }
  }

  post(product: Product) {
    this.productService.postProduct(product).subscribe({
      next: (response) => {
        console.log(response);
        this.MessageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Successo',
          detail: 'Produto adicionado com sucesso!',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (err) => {
        console.log(err);
        this.MessageService.add({
          key: 'bc',
          severity: 'warn',
          summary: 'Ops!',
          detail: 'Produto de mesmo nome e recipiente já adicionado a base!',
        });
      },
    });
  }

  put(id: number, product: Product) {
    this.productService.putProduct(id, product).subscribe({
      next: (response) => {
        console.log(response);
        this.MessageService.add({
          key: 'bc',
          severity: 'info',
          summary: 'Editado',
          detail: 'Produto editado com sucesso!',
        });
        // Atualize os dados na tabela ou lista
        const index = this.products.findIndex((product) => product.id === id);
        
        if (index !== -1) {
          this.products[index] = product;
        }
      },
      error: (err) => {
        console.log(err);
        alert('Erro ao tentar editar!');
      },
    });
  }

  getAll() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.products = response;
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getId(id: number) {
    this.productService.getId(id).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe({
      next: (response) => {
        this.product = response;
        this.MessageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Produto excluído',
        });
        setTimeout(() => {
          return window.location.reload();
        }, 1000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
