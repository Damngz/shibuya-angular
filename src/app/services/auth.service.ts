import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/users/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };
    return this.http.post<{ data: User}>(`${this.apiUrl}/login`, body).pipe(
      map(response => {
        const user = response.data;
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * Cierra la sesión del usuario actual eliminando su información del almacenamiento local.
   */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  updateProfile(updatedUser: User): Observable<User> {
    return this.http.put<any>(`${this.apiUrl}/${updatedUser.userId}`, updatedUser).pipe(
      map(response => {
        return response.data;
      })
    );
  }  

  register(newUser: User) {
    return this.http.post<{ data: User}>(`${this.apiUrl}`, newUser).pipe(
      map(response => {
        console.log(response);
        return response.data;
      })
    );
  }

  /**
   * Obtiene el usuario actualmente autenticado.
   * @returns Objeto con la información del usuario actualmente autenticado, o nulo si no hay usuario autenticado.
   */
  getCurrentUser(): any {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.currentUser;
  }

  /**
   * Verifica si hay un usuario autenticado.
   * @returns Verdadero si hay un usuario autenticado, falso de lo contrario.
   */
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
