import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { CartService } from '../../services/cart.service';

/**
 * @description
 * 
 * Componente para mostrar una lista de juegos filtrados por categoría.
 */
@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent implements OnInit {
  @Input() category: string = '';
  games: Game[] = [];

  constructor(private gameService: GameService, private cartService: CartService) { }

  /**
   * Inicializa el componente obteniendo los juegos del servicio `GameService`
   * y filtrándolos según la categoría especificada.
   */
  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      if (this.category === '') {
        this.games = games;
      } else if (this.category === 'esenciales') {
        this.games = games.filter(game => game.esencial);
      } else if (this.category === 'ofertas') {
        this.games = games.filter(game => game.oferta);
      } else {
        this.games = games.filter(game => game.categoria === this.category);
      }
    });
  }

  /**
   * Calcula el tipo de estrella (llena, mitad o vacía) según la valoración del juego.
   * @param starIndex Índice de la estrella actual.
   * @param game Juego del cual se calcula la valoración.
   * @returns Nombre de la clase de Bootstrap Icons para la estrella correspondiente.
   */
  calculateStarType(starIndex: number, game: Game): string {
    if (starIndex <= Math.floor(game.valoracion)) {
      return 'bi-star-fill';
    } else if (starIndex === Math.ceil(game.valoracion) && !Number.isInteger(game.valoracion)) {
      return 'bi-star-half';
    } else {
      return 'bi-star';
    }
  }

  /**
   * Formatea el precio del juego en formato de moneda.
   * @param price Precio del juego a formatear.
   * @returns Precio formateado como string con separadores de miles.
   */
  formatPrice(price: number | undefined): string {
    if (!price) return '$0';
    
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  /**
   * Agrega un juego al carrito de compras.
   * @param game Juego que se va a agregar al carrito.
   */
  addToCart(game: Game): void {
    this.cartService.addToCart(game);
  }
}
