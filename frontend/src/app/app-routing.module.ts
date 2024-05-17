import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MoviePageComponent } from './components/pages/movie-page/movie-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';

const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'movie/:id', component:MoviePageComponent},
  {path: 'profile', component:ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
