import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = `${environment.apiKey} `;
  private apiWeather = `${environment.apiWeather}`;

  constructor(private http: HttpClient) {}

  public getWeatherForCity(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiWeather}${city}&appid=${this.apiKey}`);
  }
}
