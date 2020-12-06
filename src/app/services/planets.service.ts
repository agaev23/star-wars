import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { filter, map, pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { PlanetsApiService } from './planets.api.service';
import { Planet, Planets } from '../models/planets.model';
import { PlanetDto, PlanetsDto } from '../models/planets.dto.model';
import { ResidentDto } from '../models/resident.dto.model';
import { Resident } from '../models/resident.model';


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
    this.resetPages();

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

  getPageInfo$(): Observable<number> {
    return this.planets$.pipe(
      pluck('pageLoaded'),
      filter((page) => !!page),
    );
  }

  getById$(id: string): Observable<Planet> {
    const planet$ = this.planetsApiService.getById$(id).pipe(
      shareReplay(),
    );

    return planet$.pipe(
      switchMap((planet: PlanetDto) => {
        if (!planet.residents.length) {
          return of([]);
        }

        const residents$ = planet.residents.map((url) => this.planetsApiService.getResident$(url));

        return forkJoin(residents$);
      }),
      withLatestFrom(planet$),
      map(([residents, planet]) => this.adaptPlanet(planet, residents)),
    );
  }

  private adaptPlanets(planets: PlanetsDto): Planets {
    return {
      hasMore: !!planets.next,
      pageLoaded: undefined,
      results: planets.results.map((planetDto: PlanetDto) => this.adaptPlanet(planetDto))
    };
  }

  private adaptPlanet(planet: PlanetDto, residents: any[] = []): Planet {
    return {
        name: planet.name,
        climate: planet.climate,
        rotationPeriod: planet.rotation_period,
        gravity: planet.gravity,
        terrain: planet.terrain,
        diameter: planet.diameter ,
        population: parseInt(planet.population, 10) || undefined,
        residents: residents.map(resident => this.adaptResident(resident)),
      };
  }

  private adaptResident(resident: ResidentDto): Resident {
    return {
      name: resident.name,
      height: resident.height,
      mass: resident.mass,
      gender: resident.gender,
    };
  }

  private resetPages(): void {
    this.planets$.next({
      hasMore: true,
      pageLoaded: 0,
      results: [],
    });
  }
}
