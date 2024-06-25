import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Game, GameCart } from '../../models/game.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * @description
 * 
 * Componente del carrito de compras
 */
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

  /**
   * Inicializa el componente obteniendo el contenido del carrito y calculando el total.
   */
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateCartTotal();
  }

  /**
   * Calcula el total del carrito sumando el precio de cada juego multiplicado por su cantidad.
   */
  calculateCartTotal(): void {
    this.cartTotal = this.cart.reduce((total, game) => total + (game.cantidad * game.precio), 0);
  }

  /**
   * Remueve un juego específico del carrito.
   * @param game El juego a ser eliminado del carrito.
   */
  removeFromCart(game: Game): void {
    this.cartService.removeFromCart(game);
    this.cart = this.cartService.getCart();
    this.calculateCartTotal();
  }

  /**
   * Procesa el pago simulado, limpia el carrito y redirige al usuario a la página de inicio.
   */
  pay(): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.cartService.clearCart();
      this.router.navigate(['/']);
      alert('Pago procesado con éxito. Gracias por preferirnos.');
    }, 4000);
  }

  /**
   * Formatea el precio en formato de moneda.
   * @param price El precio a formatear.
   * @returns El precio formateado como string.
   */
  formatPrice(price: number): string {
    return this.cartService.formatPrice(price);
  }
}
