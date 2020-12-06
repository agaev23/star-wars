import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PlanetsApiService } from './planets.api.service';
import { Planets } from '../models/planets.model';
import { PlanetDto, PlanetsDto } from '../models/planets.dto.model';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  planets$ = new BehaviorSubject<Planets>({
    hasMore: true,
    pageLoaded: 0,
    results: [],
  });

  constructor(private planetsApiService: PlanetsApiService) { }

  getPlanets$(
    paginator$: BehaviorSubject<void> = new BehaviorSubject(null)
    ): Observable<Planets> {
    return paginator$.pipe(
      switchMap(() => this.planetsApiService.getPlanets$(this.planets$.value.pageLoaded + 1)),
      map((planets) => this.adaptPlanets(planets)),
      switchMap((planets) => {
        const newPlanets = {
          hasMore: planets.hasMore,
          pageLoaded: this.planets$.value.pageLoaded + 1,
          results: [...this.planets$.value.results, ...planets.results],
        };
        this.planets$.next(newPlanets);

        return of(newPlanets);
      })
    );
  }

  private adaptPlanets(planets: PlanetsDto): Planets {
    return {
      hasMore: !!planets.next,
      pageLoaded: undefined,
      results: planets.results.map((planetDto: PlanetDto) => ({
        name: planetDto.name,
        climate: planetDto.climate,
        population: parseInt(planetDto.population, 10) || undefined,
      }))
    };
  }
}
