import { Component } from '@angular/core';
import { Movie } from '../../../shared/models/Movie';
import { Observable } from 'rxjs';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
    movies:Movie[] = [];
    constructor(movieService:MovieService) {
        let moviesObservable:Observable<Movie[]>;
        moviesObservable = movieService.getAll();

        moviesObservable.subscribe((serverMovies) => {
            this.movies = serverMovies; // When the observable changes we set the movies on this page
        })
    }
}
