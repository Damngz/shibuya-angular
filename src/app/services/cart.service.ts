// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game, GameCart } from '../models/game.model'; // Ajusta la ruta del modelo Game

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

  removeFromCart(game: Game): void {
    this.cart = this.cart.filter(cartItem => cartItem.id !== game.id);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
    this.cartCount.next(this.cart.length);
  }

  getCart(): GameCart[] {
    return this.cart;
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartCount.next(this.cart.length);
  }

  formatPrice(price: number | undefined) {
    if (!price) return `$0`;
    
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
}
