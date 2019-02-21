import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {path: '', loadChildren: './home/home.module#HomeModule'},
      {path: 'auth',  canActivate: [AuthGuard], loadChildren: './auth/auth.module#AuthModule', data:{isAuth: true}},
      {path: 'profile', canActivate: [AuthGuard], loadChildren: './profile/profile.module#ProfileModule'},
      {path: 'maps', loadChildren: './maps/maps.module#MapsModule'},

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
