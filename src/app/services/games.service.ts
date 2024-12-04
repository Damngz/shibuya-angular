import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Game } from '../models/game.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = '/api/products/products';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<{ data: Game[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<{ data: Game }>(`${this.apiUrl}`, game).pipe(
      map(response => {
        return response.data
      })
    );
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<{ data: Game}>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        return response.data;
      })
    );;
  }
  
  updateGame(game: Game): Observable<void> {
    console.log(game);
    return this.http.put<void>(`${this.apiUrl}/${game.id}`, game);
  }  
  
  deleteGame(gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${gameId}`);
  }

  private gamesUrl = 'https://firebasestorage.googleapis.com/v0/b/shibuya-654cf.appspot.com/o/games.json?alt=media&token=c7f1f9ca-caed-49fb-b31c-d6e06dfbe212';
  
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
    return this.http.get<Game[]>(`${this.apiUrl}/category/${category}`);
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
