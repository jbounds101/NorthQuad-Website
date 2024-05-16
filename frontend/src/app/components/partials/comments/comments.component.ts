import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../../shared/models/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
    user!:User;
    comments!:Comment[];
    movieId!:string;

    constructor(activatedRoute:ActivatedRoute,
        private userService:UserService, 
        private commentService:CommentService) {
        userService.userObservable.subscribe((newUser) => {
            this.user = newUser;
        })
        activatedRoute.params.subscribe((params) => {
            if (params['id']) {
                this.movieId = params['id'];
                commentService.getCommentsByMovieId(params['id']).subscribe((serverComments) => {
                    this.comments = serverComments;
                })
            }
        })
    }

    get isAuth():boolean {
        return !!this.user.token;
    }

    isUserAuth(userId:string):boolean {
        return this.isAuth && userId === this.user.id;
    }

    addComment(text:string) {
        console.log("here");
        this.commentService.createComment(text, this.user.name, this.user.id, this.movieId).subscribe(createdComment => {
            this.comments = [...this.comments, createdComment]; // Add the new comment to the page
        });
    }
    
}
