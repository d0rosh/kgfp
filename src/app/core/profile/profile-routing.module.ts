import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AdminGuard } from '../admin/admin.guard';
import { SettingsComponent } from './settings/settings.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
      {path: 'settings', component: SettingsComponent},
      {path: 'favorites', component: FavoritesComponent},
      { 
        path: 'admin', canActivate: [AdminGuard], loadChildren: '../admin/admin.module#AdminModule'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
