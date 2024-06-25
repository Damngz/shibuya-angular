import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  ngOnInit(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

    this.profileForm = this.formBuilder.group({
      nombre: [{ value: this.currentUser.nombre, disabled: !this.editing }, Validators.required],
      apellidos: [{ value: this.currentUser.apellidos, disabled: !this.editing }, Validators.required],
      telefono: [{ value: this.currentUser.telefono, disabled: !this.editing }, [Validators.required, Validators.pattern(/^\d{9}$/)]],
      ciudad: [{ value: this.currentUser.ciudad, disabled: !this.editing }, Validators.required],
      direccion: [{ value: this.currentUser.direccion, disabled: !this.editing }, Validators.required],
      email: [{ value: this.currentUser.email, disabled: !this.editing }, [Validators.required, Validators.email]]
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (this.editing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      this.profileForm.patchValue(this.currentUser);
    }
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      this.currentUser = { ...this.currentUser, ...this.profileForm.value };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.editing = false;
      this.profileForm.disable();
      alert('Perfil actualizado con éxito');
      this.router.navigate(['/perfil']);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}