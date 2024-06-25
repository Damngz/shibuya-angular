import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game, GameCart } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: GameCart[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() {
    const cartFromStorage = localStorage.getItem('cart');
    this.cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    this.cartCount.next(this.cart.length);
  }

  /**
   * Agrega un juego al carrito.
   * @param game Juego que se va a agregar al carrito.
   */
  addToCart(game: Game): void {
    const existingCartItem = this.cart.find(item => item.id === game.id);

    if (existingCartItem) {
      existingCartItem.cantidad += 1;
      existingCartItem.total = existingCartItem.cantidad * existingCartItem.precio;
    } else {
      const newCartItem = { ...game, cantidad: 1, total: game.precio };
      this.cart.push(newCartItem);
    }

    this.saveCart();
  }

  /**
   * Elimina un juego del carrito.
   * @param game Juego que se va a eliminar del carrito.
   */
  removeFromCart(game: Game): void {
    this.cart = this.cart.filter(cartItem => cartItem.id !== game.id);
    this.saveCart();
  }

  /**
   * Limpia completamente el carrito, eliminando todos los juegos.
   */
  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
    this.cartCount.next(this.cart.length);
  }

  /**
   * Obtiene una copia del carrito actual.
   * @returns Un array de objetos GameCart que representan los juegos en el carrito.
   */
  getCart(): GameCart[] {
    return this.cart;
  }

  /**
   * Guarda el carrito actual en el almacenamiento local.
   * También actualiza el conteo de elementos en el carrito.
   */
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartCount.next(this.cart.length);
  }

  /**
   * Formatea el precio para mostrarlo con separadores de miles.
   * @param price Precio a formatear.
   * @returns Una cadena formateada con el precio.
   */
  formatPrice(price: number | undefined) {
    if (!price) return `$0`;
    
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
}
