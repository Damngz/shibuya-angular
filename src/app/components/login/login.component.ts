import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @description
 * 
 * Componente para gestionar el inicio de sesión de usuarios.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup; // Formulario inicio de sesión
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  /**
   * Inicializa el componente. Redirige al usuario si ya está autenticado.
   * Configura el formulario de inicio de sesión con validaciones.
   */
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Realiza el proceso de inicio de sesión cuando el formulario es válido.
   * Si el inicio de sesión es exitoso, redirige al usuario a la página principal después de un breve periodo.
   */
  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      const loggedIn = this.authService.login(email, password);

      if (loggedIn) {
        this.loading = true;
  
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/']);
        }, 2000)
      }
    }
  }
}
