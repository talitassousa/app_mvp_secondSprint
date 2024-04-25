import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}
  validateCnpj(cnpj: string): boolean {
    if (typeof cnpj !== 'string') return false;
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14 || /^(\d)\1+$/.test(cnpj)) return false;

    // Validate the first digit
    let add = 0;
    for (let i = 0; i < 12; i++) {
      add += parseInt(cnpj.charAt(i)) * (5 - (i % 4));
    }
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (parseInt(cnpj.charAt(12)) != rev) return false;

    // Validate the second digit
    add = 0;
    for (let i = 0; i < 13; i++) {
      add += parseInt(cnpj.charAt(i)) * (6 - (i % 4));
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (parseInt(cnpj.charAt(13)) != rev) return false;

    return true;
  }
}
