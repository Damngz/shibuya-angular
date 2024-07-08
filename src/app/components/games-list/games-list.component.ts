import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

/**
 * @description
 * 
 * Componente para mostrar una lista de juegos filtrados por categoría.
 */
@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
  providers: [GameService]
})
export class GamesListComponent implements OnInit {
  @Input() category: string = '';
  games: Game[] = [];
  currentUser: User;
  showEditModal: boolean = false;
  showCreateModal: boolean = false;
  editGameForm!: FormGroup;
  createGameForm!: FormGroup;
  categories: string[] = ['aventura', 'cooperativo', 'estrategia', 'solitario', 'familiar', 'otros'];
  selectedGame: Game = {
    id: 99,
    nombre: '',
    precio: 0,
    precioOriginal: 0,
    oferta: false,
    categoria: '',
    esencial: false,
    img: 'assets/img/.jpeg',
    valoracion: 0,
  };

  constructor(private gameService: GameService, private cartService: CartService, private authService: AuthService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.currentUser = this.authService.getCurrentUser();
    this.route.url.subscribe();
    this.editGameForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      precioOriginal: [''],
      categoria: ['', Validators.required],
      esencial: [false],
      oferta: [false],
      img: ['', Validators.required]
    });
    this.createGameForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      precioOriginal: [''],
      categoria: ['', Validators.required],
      esencial: [false],
      oferta: [false],
      img: ['', Validators.required]
    });
  }

  /**
   * Inicializa el componente obteniendo los juegos del servicio `GameService`
   * y filtrándolos según la categoría especificada.
   */
  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
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

  isModifyGamesRoute(): boolean {
    return this.route.snapshot.url[0]?.path === 'modificar-juegos';
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.rol === 'admin';
  }

  openCreateModal() {
    this.showEditModal = false;
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  onSubmitNew(): void {
    if (this.createGameForm.valid) {
      const maxId = this.games.reduce((maxId, game) => game.id > maxId ? game.id : maxId, 0);
      const newGame = {
        id: maxId + 1,
        nombre: this.createGameForm.value.nombre,
        precio: this.createGameForm.value.precio,
        precioOriginal: this.createGameForm.value.precioOriginal,
        categoria: this.createGameForm.value.categoria,
        oferta: this.createGameForm.value.oferta,
        esencial: this.createGameForm.value.esencial,
        img: this.createGameForm.value.img,
        valoracion: 0
      };
      this.games.push(newGame)
      this.gameService.modifyGames(this.games);
    }
  }

  openEditModal(game: Game): void {
    this.selectedGame = game;
    this.showEditModal = true;
    this.editGameForm.patchValue({
      nombre: game.nombre,
      precio: game.precio,
      precioOriginal: game.precioOriginal,
      categoria: game.categoria,
      esencial: game.esencial,
      oferta: game.oferta,
      img: game.img
    });
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  onSubmit(): void {
    if (this.editGameForm.valid) {
      const updatedGame = {
        id: this.selectedGame.id,
        nombre: this.editGameForm.value.nombre,
        precio: this.editGameForm.value.precio,
        precioOriginal: this.editGameForm.value.precioOriginal,
        categoria: this.editGameForm.value.categoria,
        oferta: this.editGameForm.value.oferta,
        esencial: this.editGameForm.value.esencial,
        img: this.editGameForm.value.img,
        valoracion: this.selectedGame.valoracion
      };
      this.gameService.updateGame(updatedGame, this.games).subscribe(() => {
        this.loadGames();
      })
    }
  }

  deleteGame(game: Game): void {
    this.gameService.deleteGame(game.id, this.games).subscribe(() => {
      this.loadGames();
    });
  }
}
