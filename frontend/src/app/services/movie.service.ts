import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/Movie';
import { MOVIES_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    constructor(private http:HttpClient) {}

    getAll():Observable<Movie[]> {
        return this.http.get<Movie[]>(MOVIES_URL);
    }
}
