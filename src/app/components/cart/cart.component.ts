// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Ajusta la ruta según tu estructura de archivos
import { Game, GameCart } from '../../models/game.model'; // Ajusta la ruta según tu estructura de archivos
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: GameCart[] = [];
  cartTotal: number = 0;
  loading: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateCartTotal();
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cart.reduce((total, game) => total + (game.cantidad * game.precio), 0);
  }

  removeFromCart(game: Game): void {
    this.cartService.removeFromCart(game);
    this.cart = this.cartService.getCart();
    this.calculateCartTotal();
  }

  pay(): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.cartService.clearCart();
      this.router.navigate(['/']);
      alert('Pago procesado con éxito. Gracias por preferirnos.')
    }, 4000)
  }

  formatPrice(price: number): string {
    return this.cartService.formatPrice(price);
  }
}
