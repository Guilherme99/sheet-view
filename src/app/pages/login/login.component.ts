import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export enum DisplayType {
  email,
  password,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(8)]);

  getErrorMessage() {
    let error = null;
    if (this.email.hasError('required')) {
      return 'Email é obrigatória';
    }
    if (this.password.hasError('required')) {
      return 'Senha é obrigatória';
    }

    if (this.email.hasError('email')) error = 'Email inválido';
    if (this.password.hasError('password')) error = 'Senha inválida';

    return error ?? '';
  }
}
