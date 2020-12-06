import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PlanetsPageComponent } from './components/planets-page/planets-page.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetDetailsPageComponent } from './components/planet-details-page/planet-details-page.component';
import { ResidentInfoComponent } from './components/resident-info/resident-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    PlanetsPageComponent,
    PlanetDetailsPageComponent,
    ResidentInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
