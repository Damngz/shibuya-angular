import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games = [
    {
      nombre: "Catan",
      precio: 22990,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/catan.jpeg",
      esencial: true,
      categoria: "familiar"
    },
    {
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
      nombre: "Dixit",
      precio: 29990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/dixit.webp",
      esencial: true,
      categoria: "aventura"
    },
    {
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
      nombre: "3 Ring Circus",
      precio: 31990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/3ringcircus.jpg",
      esencial: true,
      categoria: "solitario"
    },
    {
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
      nombre: "Nemesis",
      precio: 149990,
      valoracion: 5,
      oferta: false,
      img: "assets/img/nemesis.jpg",
      esencial: true,
      categoria: "estrategia"
    },
    {
      nombre: "5 Minutes Dungeon",
      precio: 14990,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/5mindungeon.jpeg",
      esencial: false,
      categoria: "cooperativo"
    },
    {
      nombre: "Alice Ha Desaparecido",
      precio: 22990,
      valoracion: 5,
      oferta: false,
      img: "assets/img/alice.jpeg",
      esencial: false,
      categoria: "cooperativo"
    },
    {
      nombre: "Andor",
      precio: 19990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/andor.jpg",
      esencial: false,
      categoria: "aventura"
    },
    {
      nombre: "Arkham Horror",
      precio: 43490,
      valoracion: 5,
      oferta: false,
      img: "assets/img/arkham-horror.jpeg",
      esencial: false,
      categoria: "aventura"
    },
    {
      nombre: "Celestia",
      precio: 30990,
      valoracion: 3.5,
      oferta: false,
      img: "assets/img/celestia.jpeg",
      esencial: false,
      categoria: "aventura"
    },
    {
      nombre: "Clank! - Catacumbas",
      precio: 32290,
      valoracion: 4,
      oferta: false,
      img: "assets/img/clank.webp",
      esencial: false,
      categoria: "aventura"
    },
    {
      nombre: "Abyss",
      precio: 40240,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/abyss.png",
      esencial: false,
      categoria: "estrategia"
    },
    {
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
      nombre: "Caverna",
      precio: 22390,
      valoracion: 4,
      oferta: false,
      img: "assets/img/caverna.jpeg",
      esencial: false,
      categoria: "solitario"
    },
    {
      nombre: "Imperium: Legendarios",
      precio: 25290,
      valoracion: 3.5,
      oferta: false,
      img: "assets/img/imperium.jpeg",
      esencial: false,
      categoria: "solitario"
    },
    {
      nombre: "Bamboo",
      precio: 23290,
      valoracion: 5,
      oferta: false,
      img: "assets/img/bamboo.jpeg",
      esencial: true,
      categoria: "familiar"
    },
    {
      nombre: "Catan: Navegantes",
      precio: 34490,
      valoracion: 5,
      oferta: false,
      img: "assets/img/catan-navegantes.jpeg",
      esencial: false,
      categoria: "familiar"
    },
    {
      nombre: "Century",
      precio: 34490,
      valoracion: 5,
      oferta: false,
      img: "assets/img/century.jpeg",
      esencial: false,
      categoria: "familiar"
    },
    {
      nombre: "Carcassonne",
      precio: 29990,
      valoracion: 4.5,
      oferta: false,
      img: "assets/img/carcassonne.jpeg",
      esencial: false,
      categoria: "otros"
    },
    {
      nombre: "Bienvenido a la Mazmorra",
      precio: 13990,
      valoracion: 4,
      oferta: false,
      img: "assets/img/mazmorra.jpeg",
      esencial: false,
      categoria: "otros"
    },
    {
      nombre: "Ishtar: Jardines de Babilonia",
      precio: 23390,
      valoracion: 5,
      oferta: false,
      img: "assets/img/ishtar.jpeg",
      esencial: false,
      categoria: "otros"
    }
  ];

  constructor() { }

  getGames(): Observable<Game[]> {
    return of(this.games);
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return of(this.games.filter(game => game.categoria === category));
  }
}
