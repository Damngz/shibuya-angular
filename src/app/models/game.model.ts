export interface Game {
  nombre: string;
  precio: number;
  valoracion: number;
  oferta: boolean;
  precioOriginal?: number;
  img: string;
  esencial: boolean;
  categoria: string;
}