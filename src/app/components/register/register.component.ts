import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUser = {
    nombre: '',
    apellidos: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    email: '',
    password: '',
    rol: 'user'
  };

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: any) {
    if (form.valid && this.customValidation()) {
      this.authService.register(this.newUser)
      alert('Registro exitoso');
      this.router.navigate(['/']);
    } else {
      form.form.markAllAsTouched();
    }
  }

  customValidation(): boolean {
    let isValid = true;

    if (!this.validatePhone(this.newUser.telefono)) {
      isValid = false;
    }

    if (!this.validatePassword(this.newUser.password)) {
      isValid = false;
    }

    return isValid;
  }

  validatePhone(phone: string): boolean {
    const re = /^\d{9}$/;
    return re.test(phone);
  }

  validatePassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return re.test(password);
  }

}
