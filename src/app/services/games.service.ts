import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games = [
    {
      id: 0,
      nombre: "Catan",
      precio: 22990,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/catan.jpeg",
      esencial: true,
      categoria: "familiar"
    },
    {
      id: 1,
      nombre: "Calabozos y Dragones",
      precio: 23990,
      valoracion: 5,
      oferta: true,
      precioOriginal: 28990,
      img: "assets/img/dungeons.jpeg",
      esencial: true,
      categoria: "cooperativo"
    },
    {
      id: 2,
      nombre: "Código Secreto",
      precio: 13990,
      valoracion: 4.5,
      oferta: true,
      precioOriginal: 19990,
      img: "assets/img/codigosecreto.jpeg",
      esencial: false,
      categoria: "otros"
    },
    {
      id: 3,
      nombre: "Dixit",
      precio: 29990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/dixit.webp",
      esencial: true,
      categoria: "aventura"
    },
    {
      id: 4,
      nombre: "Gloomhaven",
      precio: 99990,
      valoracion: 5,
      oferta: true,
      precioOriginal: 129990,
      img: "assets/img/gloomhaven.jpg",
      esencial: true,
      categoria: "cooperativo"
    },
    {
      id: 5,
      nombre: "3 Ring Circus",
      precio: 31990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/3ringcircus.jpg",
      esencial: true,
      categoria: "solitario"
    },
    {
      id: 6,
      nombre: "7 Wonders",
      precio: 41990,
      valoracion: 4.5,
      oferta: true,
      precioOriginal: 47990,
      img: "assets/img/7wonders.jpeg",
      esencial: true,
      categoria: "estrategia"
    },
    {
      id: 7,
      nombre: "Nemesis",
      precio: 149990,
      valoracion: 5,
      oferta: false,
      img: "assets/img/nemesis.jpg",
      esencial: true,
      categoria: "estrategia"
    },
    {
      id: 8,
      nombre: "5 Minutes Dungeon",
      precio: 14990,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/5mindungeon.jpeg",
      esencial: false,
      categoria: "cooperativo"
    },
    {
      id: 9,
      nombre: "Alice Ha Desaparecido",
      precio: 22990,
      valoracion: 5,
      oferta: false,
      img: "assets/img/alice.jpeg",
      esencial: false,
      categoria: "cooperativo"
    },
    {
      id: 10,
      nombre: "Andor",
      precio: 19990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/andor.jpg",
      esencial: false,
      categoria: "aventura"
    },
    {
      id: 11,
      nombre: "Arkham Horror",
      precio: 43490,
      valoracion: 5,
      oferta: false,
      img: "assets/img/arkham-horror.jpeg",
      esencial: false,
      categoria: "aventura"
    },
    {
      id: 12,
      nombre: "Celestia",
      precio: 30990,
      valoracion: 3.5,
      oferta: false,
      img: "assets/img/celestia.jpeg",
      esencial: false,
      categoria: "aventura"
    },
    {
      id: 13,
      nombre: "Clank! - Catacumbas",
      precio: 32290,
      valoracion: 4,
      oferta: false,
      img: "assets/img/clank.webp",
      esencial: false,
      categoria: "aventura"
    },
    {
      id: 14,
      nombre: "Abyss",
      precio: 40240,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/abyss.png",
      esencial: false,
      categoria: "estrategia"
    },
    {
      id: 15,
      nombre: "¡Resistid!",
      precio: 21990,
      valoracion: 4,
      precioOriginal: 29990,
      oferta: true,
      img: "assets/img/resistid.jpeg",
      esencial: false,
      categoria: "estrategia"
    },
    {
      id: 16,
      nombre: "Carnegie",
      precio: 57990,
      valoracion: 5,
      precioOriginal: 67490,
      oferta: true,
      img: "assets/img/carnegie.jpeg",
      esencial: false,
      categoria: "solitario"
    },
    {
      id: 17,
      nombre: "Caverna",
      precio: 22390,
      valoracion: 4,
      oferta: false,
      img: "assets/img/caverna.jpeg",
      esencial: false,
      categoria: "solitario"
    },
    {
      id: 18,
      nombre: "Imperium: Legendarios",
      precio: 25290,
      valoracion: 3.5,
      oferta: false,
      img: "assets/img/imperium.jpeg",
      esencial: false,
      categoria: "solitario"
    },
    {
      id: 19,
      nombre: "Bamboo",
      precio: 23290,
      valoracion: 5,
      oferta: false,
      img: "assets/img/bamboo.jpeg",
      esencial: true,
      categoria: "familiar"
    },
    {
      id: 20,
      nombre: "Catan: Navegantes",
      precio: 34490,
      valoracion: 5,
      oferta: false,
      img: "assets/img/catan-navegantes.jpeg",
      esencial: false,
      categoria: "familiar"
    },
    {
      id: 21,
      nombre: "Century",
      precio: 34490,
      valoracion: 5,
      oferta: false,
      img: "assets/img/century.jpeg",
      esencial: false,
      categoria: "familiar"
    },
    {
      id: 22,
      nombre: "Carcassonne",
      precio: 29990,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/carcassonne.jpeg",
      esencial: false,
      categoria: "otros"
    },
    {
      id: 23,
      nombre: "Bienvenido a la Mazmorra",
      precio: 13990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/mazmorra.jpeg",
      esencial: false,
      categoria: "otros"
    },
    {
      id: 24,
      nombre: "Ishtar: Jardines de Babilonia",
      precio: 23390,
      valoracion: 5,
      oferta: false,
      img: "assets/img/ishtar.jpeg",
      esencial: false,
      categoria: "otros"
    }
  ];

  constructor() {}

  getGames(): Observable<Game[]> {
    return of(this.games);
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return of(this.games.filter(game => game.categoria === category));
  }
}
