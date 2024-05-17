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
    activeComment: Comment | null = null;

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
        this.commentService.createComment(text, this.user.name, this.user.id, this.movieId).subscribe(createdComment => {
            this.comments = [...this.comments, createdComment]; // Add the new comment to the page
        });
    }

    setActiveComment(comment:Comment | null) {
        this.activeComment = comment;
    }

    updateComment({text, commentId}: {text:string, commentId:string}) {
        if (text === this.activeComment?.body) return; // No change of body
        this.commentService.updateComment(text, commentId).subscribe((updatedComment) => {
            this.comments = this.comments.map(comment => {
                if (comment.id === commentId) {
                    // Update the newly edited comment
                    return updatedComment;
                } else {
                    return comment;
                }
            });
            this.activeComment = null;
        });
    }
    
    deleteComment(commentId:string) {
        this.commentService.deleteComment(commentId).subscribe(() => {
            this.comments = this.comments.filter(comment => comment.id !== commentId);
        });
    }
}
