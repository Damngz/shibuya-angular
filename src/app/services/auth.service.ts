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

  login(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  register(newUser: User) {
    this.users.push(newUser);
    this.login(newUser.email, newUser.password);
  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
