import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from '../../models/game.model';

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

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      if (this.category === '') {
        this.games = games;
      } else if (this.category === 'esenciales') {
        this.games = games.filter(game => game.esencial);
      } else if (this.category === 'ofertas') {
        this.games = games.filter(game => game.oferta)
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
    if (!price) return `$0`;
    
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
}
