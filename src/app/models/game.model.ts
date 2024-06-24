export interface Game {
  id: number;
  nombre: string;
  precio: number;
  valoracion: number;
  oferta: boolean;
  precioOriginal?: number;
  img: string;
  esencial: boolean;
  categoria: string;
}

export interface GameCart {
  id: number;
  nombre: string;
  precio: number;
  valoracion: number;
  oferta: boolean;
  precioOriginal?: number;
  img: string;
  esencial: boolean;
  categoria: string;
  cantidad: number;
  total: number;
}