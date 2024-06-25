import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * @description
 * 
 * Componente para el registro de nuevos usuarios.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  /**
   * Inicializa el formulario de registro validando cada campo
   */
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatePassword]],
      rol: ['user']
    });
  }

  /**
   * Método invocado al enviar el formulario de registro.
   * Registra al usuario si el formulario es válido, mostrando una alerta y redirigiendo al usuario a la página principal.
   */
  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
      alert('Registro exitoso'); 
      this.router.navigate(['/']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  /**
   * Validador personalizado para la contraseña.
   * Verifica que la contraseña contenga al menos una letra minúscula, una letra mayúscula, un dígito y tenga una longitud entre 8 y 20 caracteres.
   */
  validatePassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return re.test(password);
  }
}
