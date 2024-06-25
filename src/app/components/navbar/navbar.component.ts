import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() activePage: string = 'Inicio';
  cartCount: number = 0;
  currentUser: User = {
    nombre: '',
    apellidos: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    email: '',
    password: '',
    rol: ''
  };

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.currentUser = this.authService.getCurrentUser();
  }
}
