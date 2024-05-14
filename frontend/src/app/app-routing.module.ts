import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MoviePageComponent } from './components/pages/movie-page/movie-page.component';

const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'movie/:id', component:MoviePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
