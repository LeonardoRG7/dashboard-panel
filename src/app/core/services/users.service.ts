import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private _http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    return this._http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUsers(id: string, user: User): Observable<User> {
    return this._http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUsers(id: string): Observable<User> {
    return this._http.delete<User>(`${this.apiUrl}/users/${id}`, {});
  }
}
