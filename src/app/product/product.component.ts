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

  message!: string;
  action!: string;

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

  postPut(product: Product) {
    if (this.route.snapshot.paramMap.get('id')) {
      let id = Number(this.route.snapshot.paramMap.get('id'));
      this.put(id, product);
    } else {
      this.post(product);
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
          return window.location.reload();
        }, 1000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  put(id: number, product: Product) {
    this.productService.putProduct(id, product).subscribe({
      next: (response) => {
        console.log(response);
        this.MessageService.add({
          key: 'bc',
          severity: 'warn',
          summary: 'Editado',
          detail: 'Produto editado com sucesso!',
        });
        setTimeout(() => {
          return window.location.reload();
        }, 1000);
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
        this.products = response
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
        this.product = { ...response };
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
