import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlanetsApiService } from './planets.api.service';
import { Planets } from '../models/planets.model';
import { PlanetDto, PlanetsDto } from '../models/planets.dto.model';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private planetsApiService: PlanetsApiService) { }

  getPlanets$(page: number = 1): Observable<Planets> {
    return this.planetsApiService.getPlanets$(page).pipe(
      map((planets) => this.adaptPlanets(planets))
    );
  }

  private adaptPlanets(planets: PlanetsDto): Planets {
    return {
      results: planets.results.map((planetDto: PlanetDto) => ({
        name: planetDto.name,
        climate: planetDto.climate,
        population: parseInt(planetDto.population, 10) || undefined,
      }))
    };
  }
}
