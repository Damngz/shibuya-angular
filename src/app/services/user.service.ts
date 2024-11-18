import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://host.docker.internal:8080/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/${userId}`).pipe(
      map(response => response.data)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<{ data: User }>(this.apiUrl, user).pipe(
      map(response => response.data)
    );
  }

  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<{ data: User }>(`${this.apiUrl}/${userId}`, updatedUser).pipe(
      map(response => response.data)
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}

