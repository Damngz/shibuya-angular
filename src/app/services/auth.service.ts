import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      "nombre": "José Miguel",
      "apellidos": "Rojas Pérez",
      "telefono": "984948321",
      "ciudad": "Osorno",
      "direccion": "Av. providencia 9839",
      "email": "user1@gmail.com",
      "password": "Password1",
      "rol": "user"
    },
    {
      "nombre": "María Isabel",
      "apellidos": "López Sánchez",
      "telefono": "987654321",
      "ciudad": "Santiago",
      "direccion": "Calle San Martín 543",
      "email": "user2@gmail.com",
      "password": "Password2",
      "rol": "user"
    },
    {
      "nombre": "Daniel",
      "apellidos": "Muñoz",
      "telefono": "990894243",
      "ciudad": "Santiago",
      "direccion": "Calle mi casa 123",
      "email": "admin@shibuya.com",
      "password": "adminShibuya2024",
      "rol": "admin"
    }
  ];

  constructor() {}

  /**
   * Intenta autenticar al usuario con las credenciales proporcionadas.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Verdadero si las credenciales son válidas, falso de lo contrario.
   */
  login(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  /**
   * Cierra la sesión del usuario actual eliminando su información del almacenamiento local.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  /**
   * Registra un nuevo usuario.
   * @param newUser Objeto con la información del nuevo usuario a registrar.
   */
  register(newUser: User) {
    this.users.push(newUser);
    this.login(newUser.email, newUser.password);
  }

  /**
   * Obtiene el usuario actualmente autenticado.
   * @returns Objeto con la información del usuario actualmente autenticado, o nulo si no hay usuario autenticado.
   */
  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  /**
   * Verifica si hay un usuario autenticado.
   * @returns Verdadero si hay un usuario autenticado, falso de lo contrario.
   */
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
