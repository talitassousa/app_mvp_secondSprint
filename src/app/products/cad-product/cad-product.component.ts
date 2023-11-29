import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cad-product',
  templateUrl: './cad-product.component.html',
  styleUrls: ['./cad-product.component.css'],
  providers: [MessageService],
})
export class CadProductComponent {
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
          this.router.navigate(['/products']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.MessageService.add({
          key: 'bc',
          severity: 'warn',
          summary: 'Ops!',
          detail: 'Produto de mesmo nome e recipiente já adicionado a base!',
        });
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
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
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        alert('Erro ao tentar editar!');
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
}
