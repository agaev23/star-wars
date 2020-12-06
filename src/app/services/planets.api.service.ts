import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PlanetDto, PlanetsDto } from '../models/planets.dto.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlanetsApiService {
  private readonly BASE_URL = 'http://swapi.dev/api/planets/';

  constructor(private http: HttpClient) { }

  getPlanets$(page: number = 1): Observable<PlanetsDto> {
    let params = new HttpParams();
    params = params.append('page', page.toString());

    return this.http.get<PlanetsDto>(this.BASE_URL, {params}).pipe(
      catchError(() => of({
        count: 0,
        next: undefined,
        previous: undefined,
        results: [],
      })),
    );
  }

  getById$(id: string): Observable<PlanetDto> {
    return this.http.get<PlanetDto>(`${this.BASE_URL}${id}/`);
  }

  getResident$(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
