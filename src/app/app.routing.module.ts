import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PlanetsPageComponent } from './components/planets-page/planets-page.component';


const appRoutes: Routes = [
    { path: 'planets', component: PlanetsPageComponent},
    { path: '', redirectTo: 'planets', pathMatch: 'full' },
    { path: 'not-found', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/not-found' },
];

@NgModule({
    imports: [RouterModule, RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
