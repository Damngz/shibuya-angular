import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer 011e9970-0892-41ff-8067-e29f447fc7da',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  }

  private gamesUrl = 'https://firebasestorage.googleapis.com/v0/b/shibuya-654cf.appspot.com/o/games.json?alt=media&token=011e9970-0892-41ff-8067-e29f447fc7da';
  
  private games: Game[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los juegos disponibles.
   * @returns Un observable que emite un array de objetos Game.
   */
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl);
  }

  /**
   * Obtiene juegos filtrados por una categoría específica.
   * @param category Categoría por la cual se van a filtrar los juegos.
   * @returns Un observable que emite un array de objetos Game que pertenecen a la categoría especificada.
   */
  getGamesByCategory(category: string): Observable<Game[]> {
    return of(this.games.filter(game => game.categoria === category));
  }

  deleteGame(gameId: number, games: Game[]): Observable<Game[]> {
    this.games = games.filter(game => game.id !== gameId);
    this.modifyGames(this.games);
    return of(this.games);
  }

  updateGame(updatedGame: Game, games: Game[]): Observable<Game[]> {
    const index = games.findIndex(game => game.id === updatedGame.id);
    if (index !== -1) {
      games[index] = updatedGame;
      this.modifyGames(games);
    }
    return of(games);
  }

  modifyGames(games: Game[]) {
    if (games.length === 0) return;
    this.http.post(this.gamesUrl, games, this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobreescrito con éxito: ', response);
      },
      error => {
        console.error('Error al sobreescribir el archivo JSON: ', error);
      }
    )
  }
}
