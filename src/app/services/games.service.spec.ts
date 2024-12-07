import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameService } from './games.service';
import { Game } from '../models/game.model';

describe('GameService', () => {
  let gameService: GameService;
  let httpMock: HttpTestingController;

  const mockGames: Game[] = [
    {
      id: 1,
      nombre: 'Super Mario',
      precio: 50,
      valoracion: 4.8,
      oferta: '20% de descuento',
      img: 'url_to_image',
      esencial: 'Sí',
      categoria: 'Aventura',
      stock: 100
    },
    {
      id: 2,
      nombre: 'Zelda',
      precio: 60,
      valoracion: 4.9,
      oferta: '10% de descuento',
      img: 'url_to_image',
      esencial: 'Sí',
      categoria: 'Aventura',
      stock: 50
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });

    gameService = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  it('should fetch games successfully', () => {
    gameService.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(mockGames);
    });

    const req = httpMock.expectOne('http://localhost:8081/products');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockGames });
  });

  it('should add a game successfully', () => {
    const newGame: Game = {
      id: 3,
      nombre: 'New Game',
      precio: 40,
      valoracion: 4.5,
      oferta: '15% de descuento',
      img: 'url_to_image',
      esencial: 'No',
      categoria: 'Acción',
      stock: 200
    };

    gameService.addGame(newGame).subscribe(response => {
      expect(response).toEqual(newGame);
    });

    const req = httpMock.expectOne('http://localhost:8081/products');
    expect(req.request.method).toBe('POST');
    req.flush({ data: newGame });
  });

  it('should get a game by id successfully', () => {
    const gameId = 1;
    gameService.getGameById(gameId).subscribe(game => {
      expect(game.id).toBe(gameId);
      expect(game).toEqual(mockGames[0]);
    });

    const req = httpMock.expectOne(`http://localhost:8081/products/${gameId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockGames[0] });
  });

  it('should update a game successfully', () => {
    const updatedGame: Game = {
      id: 1,
      nombre: 'Super Mario Updated',
      precio: 55,
      valoracion: 4.9,
      oferta: '25% de descuento',
      img: 'url_to_image',
      esencial: 'Sí',
      categoria: 'Aventura',
      stock: 90
    };

    gameService.updateGame(updatedGame).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:8081/products/${updatedGame.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('should delete a game successfully', () => {
    const gameId = 1;

    gameService.deleteGame(gameId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:8081/products/${gameId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should fetch games by category successfully', () => {
    const category = 'Aventura';
    gameService.getGamesByCategory(category).subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(mockGames);
    });

    const req = httpMock.expectOne(`http://localhost:8081/products/category/${category}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });
});
