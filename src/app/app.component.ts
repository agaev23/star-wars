import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PlanetsService } from './services/planets.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pagesLoaded: number;

  constructor(
    private planetsService: PlanetsService,
  ) {}

  ngOnInit(): void {
    this.planetsService.getPageInfo$().pipe(
      untilDestroyed(this),
    ).subscribe(page => this.pagesLoaded = page);
  }
}
