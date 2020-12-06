import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Planet } from 'src/app/models/planets.model';
import { PlanetsService } from 'src/app/services/planets.service';

@UntilDestroy()
@Component({
  selector: 'app-planet-details-page',
  templateUrl: './planet-details-page.component.html',
  styleUrls: ['./planet-details-page.component.scss']
})
export class PlanetDetailsPageComponent implements OnInit {

  planet: Planet;

  constructor(
    private route: ActivatedRoute,
    private planetsService: PlanetsService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.planetsService.getById$(id).pipe(
      untilDestroyed(this),
    ).subscribe(planet => {
      this.planet = planet;
    });
  }
}
