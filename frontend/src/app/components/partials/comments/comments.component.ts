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

    constructor(activatedRoute:ActivatedRoute,
        private userService:UserService, 
        private commentService:CommentService) {
        userService.userObservable.subscribe((newUser) => {
            this.user = newUser;
        })
        activatedRoute.params.subscribe((params) => {
            if (params['id']) {
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
    
}
