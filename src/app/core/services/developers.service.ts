import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Notification } from '../interfaces/notification';
import { Commit } from '../interfaces/commit';
import { Server } from '../interfaces/server';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private _http: HttpClient) {}

  loginUser(user: string, password: string) {
    return this._http.get<any>(
      `${this.apiUrl}/login?user=${user}&password=${password}`
    );
  }

  // TODO: API’s Generales

  getNotificaction(): Observable<Notification[]> {
    return this._http.get<Notification[]>(`${this.apiUrl}/notification
    `);
  }

  getTask() {
    return this._http.get<any>(`${this.apiUrl}/todos
    `);
  }

  // TODO: API’s Dashboard

  getTopCharts() {
    return this._http.get<any>(`${this.apiUrl}/dashboard_cards
      `);
  }

  getSeerverDetails(): Observable<Server> {
    return this._http.get<Server>(`${this.apiUrl}/cpu_report
      `);
  }

  getCommitsReports(): Observable<Commit[]> {
    return this._http.get<Commit[]>(`${this.apiUrl}/report_commits
      `);
  }

  getDeliveryReports() {
    return this._http.get<any>(`${this.apiUrl}/release_resume
      `);
  }
}