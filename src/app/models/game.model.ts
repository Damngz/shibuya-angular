export interface Game {
  id: number;
  nombre: string;
  precio: number;
  valoracion: number;
  oferta: string;
  precioOriginal?: number;
  img: string;
  esencial: string;
  categoria: string;
  stock: number;
  productId?: number;
}

export interface GameCart {
  id: number;
  nombre: string;
  precio: number;
  valoracion: number;
  oferta: string;
  precioOriginal?: number;
  img: string;
  esencial: string;
  categoria: string;
  cantidad: number;
  stock: number;
  total: number;
  productId?: number;
}