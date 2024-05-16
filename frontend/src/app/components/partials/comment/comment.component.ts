import { Component, Input } from '@angular/core';
import { Comment } from '../../../shared/models/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
    @Input() comment!:Comment;
    @Input() isUserAuth!:boolean;
}
