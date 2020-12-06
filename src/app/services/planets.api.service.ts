import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanetsDto } from '../models/planets.dto.model';


@Injectable({
  providedIn: 'root'
})
export class PlanetsApiService {
  private readonly BASE_URL = 'http://swapi.dev/api/planets/';

  constructor(private http: HttpClient) { }

  getPlanets$(page: number = 1): Observable<PlanetsDto> {
    let params = new HttpParams();
    params = params.append('page', page.toString());

    return this.http.get<PlanetsDto>(this.BASE_URL, {params});
  }
}
