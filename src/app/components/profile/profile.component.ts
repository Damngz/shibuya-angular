import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @description
 * 
 * Componente para la gestión del perfil de usuario.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User = this.authService.getCurrentUser();
  editing: boolean = false;
  profileForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  /**
   * Inicializa el componente.
   * Si no hay un usuario autenticado, redirige a la página de inicio de sesión.
   * Configura el formulario de perfil con datos iniciales del usuario actual.
   */
  ngOnInit(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

    this.profileForm = this.formBuilder.group({
      name: [{ value: this.currentUser.name, disabled: !this.editing }, Validators.required],
      last_names: [{ value: this.currentUser.lastNames, disabled: !this.editing }, Validators.required],
      phone: [{ value: this.currentUser.phone, disabled: !this.editing }, [Validators.required, Validators.pattern(/^\d{9}$/)]],
      city: [{ value: this.currentUser.city, disabled: !this.editing }, Validators.required],
      address: [{ value: this.currentUser.address, disabled: !this.editing }, Validators.required],
      email: [{ value: this.currentUser.email, disabled: !this.editing }, [Validators.required, Validators.email]]
    });
  }

  /**
   * Alterna entre el modo de edición del perfil.
   * Habilita o deshabilita la edición del formulario según el estado de 'editing'.
   */
  toggleEdit(): void {
    this.editing = !this.editing;
    if (this.editing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      this.profileForm.patchValue(this.currentUser);
    }
  }

  /**
   * Guarda los cambios realizados en el perfil del usuario.
   * Si el formulario es válido, actualiza los datos del usuario, guarda en localStorage
   * y muestra un mensaje de éxito. Luego, desactiva la edición y redirige al perfil.
   * Si el formulario no es válido, marca todos los campos como tocados para mostrar los errores.
   */
  saveChanges(): void {
    if (this.profileForm.valid) {
      this.currentUser = { ...this.currentUser, ...this.profileForm.value };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      this.authService.updateProfile(this.currentUser).subscribe(
        (updatedUser) => {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.editing = false;
          this.profileForm.disable();
          alert('Perfil actualizado con éxito');
          this.router.navigate(['/perfil']);
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Error al actualizar el perfil');
        }
      );
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  /**
   * Cierra la sesión del usuario y redirige a la página de inicio.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
