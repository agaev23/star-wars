import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { Planet, Planets } from 'src/app/models/planets.model';
import { PlanetsService } from 'src/app/services/planets.service';

@UntilDestroy()
@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss']
})
export class PlanetsPageComponent implements OnInit {

  planets: Planet[];
  paginator$ = new BehaviorSubject<void>(null);
  hasMore: boolean;
  isLoading: boolean;

  constructor(
    private planetsService: PlanetsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.planetsService.getPlanets$(this.paginator$).pipe(
      untilDestroyed(this),
    ).subscribe((planets: Planets) => {
        this.planets = planets.results;
        this.hasMore = planets.hasMore;
        this.isLoading = false;
      });
  }

  loadMore(): void {
    this.isLoading = true;
    this.paginator$.next();
  }

  navigateToPlanet(id: number): void{
    this.router.navigate([ id ], {relativeTo: this.route});
  }
}
