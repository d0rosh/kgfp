import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, SettingsComponent, FavoritesComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class ProfileModule { }
