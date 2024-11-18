import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  currentUser = this.authService.getCurrentUser();

  constructor(
    private gameService: GameService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      if (this.category === '') {
        this.games = games;
      } else if (this.category === 'esenciales') {
        this.games = games.filter(game => game.esencial === 'Y');
      } else if (this.category === 'ofertas') {
        this.games = games.filter(game => game.oferta === 'Y')
      } else {
        this.games = games.filter(game => game.categoria === this.category);
      }
    });
  }

  calculateStarType(starIndex: number, game: Game): string {
    if (starIndex <= Math.floor(game.valoracion)) {
      return 'bi-star-fill';
    } else if (starIndex === Math.ceil(game.valoracion) && !Number.isInteger(game.valoracion)) {
      return 'bi-star-half';
    } else {
      return 'bi-star';
    }
  }

  formatPrice(price: number | undefined) {
    if (!price) return ;
    
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }

  addToCart(game: Game): void {
    this.cartService.addToCart(game);
  }

  addGame() {
    this.router.navigate(['/agregar-juego']);
  }

  updateGame(id: number | undefined) {
    this.router.navigate(['/editar-juego/' + id]);
  }

  loadGames(): void {
    this.gameService.getGames().subscribe(games => {
      if (this.category === '') {
        this.games = games;
      } else {
        this.games = games.filter(game => game.categoria === this.category);
      }
    });
  }

  deleteGame(gameId: number | undefined): void {
    if (!gameId) return;
    if (confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      this.gameService.deleteGame(gameId).subscribe(() => {
        alert('Juego eliminado con éxito');
        this.loadGames();
      });
    }
  }

}
