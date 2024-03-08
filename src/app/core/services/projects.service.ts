import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private _http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this._http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  createProject(user: Project): Observable<Project> {
    return this._http.post<Project>(`${this.apiUrl}/projects`, user);
  }

  updateProjects(id: string, user: Project): Observable<Project> {
    return this._http.put<Project>(`${this.apiUrl}/projects/${id}`, user);
  }

  deleteProjects(id: string): Observable<Project> {
    return this._http.delete<Project>(`${this.apiUrl}/projects/${id}`, {});
  }
}
