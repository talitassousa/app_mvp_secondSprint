import { ValidatorsService } from './../../core/validators.service';
import { CnpjMascaraPipe } from './../../pipes/cnpj-mascara.component';
import { Component } from '@angular/core';
import { ProviderService } from './provider.service';
import { MessageService } from 'primeng/api';
import { Provider } from '../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { cnpj } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
  providers: [MessageService, CnpjMascaraPipe],
})
export class ProviderComponent {
  formulario = new FormGroup({
    nome: new FormControl({ value: '', disabled: false }),
    cnpj: new FormControl({ value: '', disabled: false }),
    cep: new FormControl({ value: '', disabled: false }),
    cidade: new FormControl({ value: '', disabled: false }),
    uf: new FormControl({ value: '', disabled: false }),
  });

  logradouro: string = '';
  bairro = new FormControl('');
  cepData: any;
  isValidCnpj: boolean = false;
  cnpjValidado: boolean = false;
  providers: Provider[] = [];
  provider = new Provider();

  constructor(
    private providerService: ProviderService,
    private MessageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private cnpjMascaraPipe: CnpjMascaraPipe,
    private validatorsService: ValidatorsService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.getProviders();
  }
  form = this.fb.group({
    cnpj: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(18)],
    ],
    tipoLogin: ['', Validators.required],
  });
  getProviders() {
    this.providerService.getProviders().subscribe(
      (providers: Provider[]) => {
        this.providers = providers;
      },
      (error) => {
        console.error('Erro ao obter fornecedores:', error);
      }
    );
  }

  consultaCep(valor: string) {
    this.providerService
      .buscarCep(valor)
      .subscribe((dados) => this.populaForm(dados));
  }

  populaForm(dados: any) {
    this.formulario.setValue({
      cep: dados.cep,
      cidade: dados.localidade,
      uf: dados.uf,
      nome: this.formulario.value.nome ?? '',
      cnpj: this.formulario.value.cnpj ?? '',
    });
  }

  onBlur(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.consultaCep(value);
  }

  // Adiciona um novo fornecedor.
  post() {
    console.log(this.formulario.value);
    this.providerService
      .postProvider(this.formulario.value as unknown as Provider)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.MessageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Successo',
            detail: 'Fornecedor adicionado com sucesso!',
          });
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        },
      });
  }
  
  validarCnpj(control: any) {
    const cnpj = control.value;

    if (this.validatorsService.validateCnpj(cnpj)) {
      return null;
    } else {
      return { invalidCnpj: true };
    }
  }

  cnpjPipeTransform(value: string): string {
    return this.cnpjMascaraPipe.transform(value);
  }
}
