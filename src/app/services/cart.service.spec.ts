import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Game } from '../models/game.model';

describe('CartService', () => {
  let cartService: CartService;

  const mockGame: Game = {
    id: 1,
    nombre: 'Super Mario',
    precio: 50,
    valoracion: 4.8,
    oferta: '20% de descuento',
    img: 'url_to_image',
    esencial: 'Sí',
    categoria: 'Aventura',
    stock: 100,
    productId: 1
  };

  const mockGameCart = {
    ...mockGame,
    cantidad: 1,
    total: mockGame.precio
  };

  beforeEach(() => {
    const localStorageMock = {
      getItem: (key: string) => {
        return key === 'cart' ? JSON.stringify([mockGameCart]) : null;
      },
      setItem: (key: string, value: string) => {},
      removeItem: (key: string) => {}
    };
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);

    TestBed.configureTestingModule({
      providers: [CartService]
    });

    cartService = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  it('should initialize with cart items from localStorage', () => {
    expect(cartService.getCart().length).toBe(1);
    expect(cartService.getCart()[0]).toEqual(mockGameCart);
  });

  it('should add a game to the cart', () => {
    const newGame: Game = {
      id: 2,
      nombre: 'Zelda',
      precio: 60,
      valoracion: 4.9,
      oferta: '10% de descuento',
      img: 'url_to_image',
      esencial: 'Sí',
      categoria: 'Aventura',
      stock: 50,
      productId: 2
    };

    cartService.addToCart(newGame);

    expect(cartService.getCart().length).toBe(2);
    expect(cartService.getCart().find(item => item.productId === newGame.productId)).toEqual({
      ...newGame,
      cantidad: 1,
      total: newGame.precio
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cartService.getCart()));
  });

  it('should update the quantity and total of an existing game in the cart', () => {
    cartService.addToCart(mockGame);

    const updatedGame = cartService.getCart().find(item => item.productId === mockGame.productId);
    expect(updatedGame?.cantidad).toBe(2);
    expect(updatedGame?.total).toBe(mockGame.precio * 2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cartService.getCart()));
  });

  it('should remove a game from the cart', () => {
    cartService.removeFromCart(mockGame);

    expect(cartService.getCart().length).toBe(0);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cartService.getCart()));
  });

  it('should clear the cart', () => {
    cartService.clearCart();

    expect(cartService.getCart().length).toBe(0);

    expect(localStorage.removeItem).toHaveBeenCalledWith('cart');
  });

  it('should format the price correctly', () => {
    const formattedPrice = cartService.formatPrice(1000);
    expect(formattedPrice).toBe('$1.000');
  });

  it('should format zero price correctly', () => {
    const formattedPrice = cartService.formatPrice(0);
    expect(formattedPrice).toBe('$0');
  });
});
