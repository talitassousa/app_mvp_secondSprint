import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjMascara',
})
export class CnpjMascaraPipe implements PipeTransform {
  transform(value?: string): any {
    value = value?.replace(/\D/g, '');

    if (!value) return;

    if (value.length === 14) {
      return value.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }

    return value;
  }
}
