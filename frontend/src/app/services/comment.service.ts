import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COMMENTS_URL, COMMENTS_URL_BY_MOVIE_ID, COMMENTS_URL_BY_USER_ID } from '../shared/constants/urls';
import { Comment } from '../shared/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    constructor(private http:HttpClient) {}

    getAll():Observable<Comment[]> {
        return this.http.get<Comment[]>(COMMENTS_URL);
    }

    getCommentsByMovieId(movieId:string):Observable<Comment[]> {
        return this.http.get<Comment[]>(COMMENTS_URL_BY_MOVIE_ID + movieId)
    }

    getCommentsByUserId(userId:string):Observable<Comment[]> {
        return this.http.get<Comment[]>(COMMENTS_URL_BY_USER_ID + userId)
    }

    createComment(body:string, userName:string, userId:string, movieId:string):Observable<Comment> {
        return this.http.post<Comment>(COMMENTS_URL, {
            body: body,
            userName: userName,
            userId: userId,
            movieId: movieId
        })
    }
}

