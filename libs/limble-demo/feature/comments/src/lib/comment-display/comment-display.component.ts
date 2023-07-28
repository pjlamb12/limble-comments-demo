import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimbleComment } from '@limble-demo/limble-demo/util/comments';
import { User } from '@limble-demo/shared/util';

@Component({
  selector: 'ld-comment-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.scss'],
})
export class CommentDisplayComponent {
  @Input({ required: true }) comment!: LimbleComment;
  @Input({ required: true }) userList!: User[];

  get formattedString() {
    return this.comment.message.replace(
      /@(\S+?)(?=\s|[^\w\s]|$)/g,
      (match: string, mention: string) => {
        const matchedUser = this.userList.find((user: User) => {
          return user.name === mention;
        });

        if (
          this.userList.find((user: User) => {
            return user.name === mention;
          })
        ) {
          return `<span class="mention-text">${match}</span>`;
        } else {
          return match;
        }
      }
    );
  }
}
