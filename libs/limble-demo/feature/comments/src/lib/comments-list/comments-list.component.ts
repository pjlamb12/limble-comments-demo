import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LimbleComment } from '@limble-demo/limble-demo/util/comments';
import { User } from '@limble-demo/shared/util';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { CommentDisplayComponent } from '../comment-display/comment-display.component';

@Component({
  selector: 'ld-comments-list',
  standalone: true,
  imports: [
    CommentDisplayComponent,
    NgFor,
    AsyncPipe,
    NgIf,
    AddCommentComponent,
  ],
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent {
  userList: User[] = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' },
  ];
  comments: LimbleComment[] = [
    { message: 'Comment 1' },
    { message: 'Comment 2' },
    { message: 'Comment 3' },
  ];

  constructor() {}

  addComment(commentText: string) {
    console.log('New comment text', commentText);
    this.comments.push({ message: commentText as string });

    this.checkForUserMention(commentText ?? '');
  }

  checkForUserMention(commentText: string) {
    const mentionedUsers: string[] = this.userList
      .filter((user: User) => {
        return commentText.includes(user.name);
      })
      .map((user: User) => {
        return user.name;
      });

    if (mentionedUsers.length) {
      const alertText = `${mentionedUsers.join(', ')} ${
        mentionedUsers.length === 1 ? 'was' : 'were'
      } mentioned`;

      alert(alertText);
    }
  }
}
