import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapFirstComponent } from './map-first/map-first.component';
import { MapSecondComponent } from './map-second/map-second.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'first-map'
  },
  {
    path: 'first-map', component: MapFirstComponent
  },
  {
    path: 'second-map', component: MapSecondComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
