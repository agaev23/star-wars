import { Component, OnInit } from '@angular/core';
import { Planet, Planets } from 'src/app/models/planets.model';
import { PlanetsService } from 'src/app/services/planets.service';

@Component({
  selector: 'app-planets-page',
  templateUrl: './planets-page.component.html',
  styleUrls: ['./planets-page.component.scss']
})
export class PlanetsPageComponent implements OnInit {

  planets: Planet[];

  constructor(
    private planetsService: PlanetsService,
  ) { }

  ngOnInit(): void {
    this.planetsService.getPlanets$().subscribe((planets: Planets) => this.planets = planets.results);
  }
}
