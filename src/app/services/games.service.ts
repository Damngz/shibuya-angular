import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Game } from '../models/game.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // private apiUrl = '/api/products/products';
  private apiUrl = 'http://localhost:8081/products'

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

  getGamesByCategory(category: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/category/${category}`);
  }
}
