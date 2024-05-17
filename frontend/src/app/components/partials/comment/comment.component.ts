import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../shared/models/Comment';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
    @Input() comment!:Comment;
    @Input() isUserAuth!:boolean;
    @Input() movieId!:string;
    @Input() user!:User;
    @Input() activeComment!:Comment | null;

    @Output() setActiveComment = new EventEmitter<Comment | null>();
    @Output() updateComment = new EventEmitter<{
        text:string;
        commentId:string;
    }>();
    @Output() deleteComment = new EventEmitter<string>();


    isActiveComment():boolean { // Active edit comment
        return this.comment === this.activeComment;
    }
    
 
}
