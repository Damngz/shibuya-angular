import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamesListComponent } from './games-list.component';
import { GameService } from '../../services/games.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Game } from '../../models/game.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;

  let gameServiceMock: jasmine.SpyObj<GameService>;
  let cartServiceMock: jasmine.SpyObj<CartService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  const mockGames: Game[] = [
    {
      id: 1,
      nombre: 'Game 1',
      precio: 50,
      valoracion: 4.5,
      oferta: 'Y',
      img: 'url_to_image',
      esencial: 'Y',
      categoria: 'Aventura',
      stock: 10,
      productId: 1
    },
    {
      id: 2,
      nombre: 'Game 2',
      precio: 30,
      valoracion: 3.8,
      oferta: 'N',
      img: 'url_to_image',
      esencial: 'N',
      categoria: 'Acción',
      stock: 5,
      productId: 2
    }
  ];

  beforeEach(() => {
    gameServiceMock = jasmine.createSpyObj('GameService', ['getGames', 'deleteGame']);
    cartServiceMock = jasmine.createSpyObj('CartService', ['addToCart']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [GamesListComponent],
      declarations: [],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load games on init', () => {
    gameServiceMock.getGames.and.returnValue(of(mockGames));
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.games.length).toBe(2);
    expect(component.games[0].nombre).toBe('Game 1');
    expect(component.games[1].nombre).toBe('Game 2');
  });

  it('should filter games by category', () => {
    gameServiceMock.getGames.and.returnValue(of(mockGames));
    component.category = 'Aventura';
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.games.length).toBe(1);
    expect(component.games[0].categoria).toBe('Aventura');
  });

  it('should add a game to the cart', () => {
    const gameToAdd = mockGames[0];
    cartServiceMock.addToCart.and.stub();

    component.addToCart(gameToAdd);

    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(gameToAdd);
  });

  it('should navigate to add game page', () => {
    component.addGame();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/agregar-juego']);
  });

  it('should navigate to update game page', () => {
    const gameId = 1;
    component.updateGame(gameId);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/editar-juego/' + gameId]);
  });

  it('should delete a game', () => {
    gameServiceMock.getGames.and.returnValue(of(mockGames));
    gameServiceMock.deleteGame.and.returnValue(of(void 0));

    const gameId = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');

    component.deleteGame(gameId);

    expect(gameServiceMock.deleteGame).toHaveBeenCalledWith(gameId);
    expect(window.alert).toHaveBeenCalledWith('Juego eliminado con éxito');
    expect(component.games.length).toBe(2);
  });

  it('should calculate the correct star type', () => {
    const starType = component.calculateStarType(3, mockGames[0]);
    expect(starType).toBe('bi-star-fill');
  });

  it('should format the price correctly', () => {
    const formattedPrice = component.formatPrice(1000);
    expect(formattedPrice).toBe('$1.000');
  });

  it('should not format price if price is undefined', () => {
    const formattedPrice = component.formatPrice(undefined);
    expect(formattedPrice).toBeUndefined();
  });
});
