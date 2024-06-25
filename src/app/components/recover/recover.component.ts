import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * @description
 * 
 * Componente para la recuperación de contraseña.
 */
@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {
  recoveryForm: FormGroup;
  emailSent: boolean = false;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Envía el correo electrónico de recuperación si el formulario es válido.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  sendRecoveryEmail(): void {
    if (this.recoveryForm.invalid) {
      this.recoveryForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.emailSent = true;
    }, 2000)
  }
}
