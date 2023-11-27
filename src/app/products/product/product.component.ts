import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';
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
   this.getAll()
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

  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe({
      next: (response) => {
        this.product = response
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
