import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';
import { ProductService } from './product.service';
import { Provider } from 'src/app/models/provider';

@Component({
  selector: 'app-home',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  poviders: Provider[] = [];

  product = new Product();
  provider = new Provider();

  editingMode = false;
  editingProduct: Product = new Product();

  message!: string;
  action!: string;

  form: any;

  // Inicializa o componente, injetando os serviços necessários.
  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private MessageService: MessageService,
    private productService: ProductService
  ) {}

  // Método chamado durante a inicialização do componente.
  ngOnInit(): void {
    this.getAll();
    
  }

  // Obtém todos os produtos do serviço e atualiza a lista de produtos.
  getAll() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

 

  // Deleta um produto com o ID fornecido.
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
