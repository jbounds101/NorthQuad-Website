import { Component } from '@angular/core';
import { Movie } from '../../../shared/models/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent {
    movie!: Movie;
    constructor(activatedRoute:ActivatedRoute, movieService:MovieService, private router:Router) {
        activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                movieService.getMovieById(params['id']).subscribe((serverMovie) => {
                    this.movie = serverMovie;
                })
            }
        })
    }
}
