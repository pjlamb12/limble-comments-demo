import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  findSubstringFromLastAtSign,
  findSubstringUntilLastAtSign,
} from '@limble-demo/limble-demo/util/comments';
import { KeyboardSelectDirective } from '@limble-demo/shared/directives';
import { KeyCodes, User } from '@limble-demo/shared/util';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'ld-add-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
    KeyboardSelectDirective,
  ],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Input() userList: User[] = [];
  @Output() commentAdded: EventEmitter<string> = new EventEmitter<string>();
  private showUserListBs: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public showUserList$: Observable<boolean> =
    this.showUserListBs.asObservable();
  private keyboardSelectedResultBs: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);
  public keyboardSelectedResult$: Observable<number> =
    this.keyboardSelectedResultBs.asObservable();
  public commentForm = this._fb.group({
    commentText: ['', [Validators.required]],
  });
  @ViewChild('commentInput', { static: true })
  commentInput!: ElementRef<HTMLInputElement>;
  public userList$ = this.commentForm.controls.commentText.valueChanges.pipe(
    startWith(''),
    map((commentText) => {
      if (commentText && commentText.charAt(commentText.length - 1) !== '@') {
        const stringToMatch = findSubstringFromLastAtSign(commentText);
        const filtered = this.userList.filter((user: User) => {
          return user.name.toLowerCase().includes(stringToMatch.toLowerCase());
        });

        if (filtered.length) {
          this.keyboardSelectedResultBs.next(0);
        }

        return filtered;
      }

      return this.userList;
    })
  );

  constructor(private _fb: FormBuilder) {}

  addCommentHandler() {
    const { commentText } = this.commentForm.value;

    if (commentText) {
      this.commentAdded.emit(commentText);
    }

    this.commentForm.reset();
  }

  selectUser(user: User) {
    const { commentText } = this.commentForm.value;
    const substring = commentText
      ? findSubstringUntilLastAtSign(commentText)
      : '';
    this.commentForm.patchValue({ commentText: `${substring}${user.name}` });
    this.showUserListBs.next(false);
    this.commentInput.nativeElement.focus();
  }

  atKeyPressedHandler() {
    this.showUserListBs.next(true);
    if (this.userList.length) {
      this.keyboardSelectedResultBs.next(0);
    }
  }

  escKeyPressedHandler() {
    this.showUserListBs.next(false);
  }

  enterKeyPressedHandler() {
    if (this.showUserListBs.value && this.keyboardSelectedResultBs.value > -1) {
      this.selectUser(this.userList[this.keyboardSelectedResultBs.value]);
      this.showUserListBs.next(false);
      this.keyboardSelectedResultBs.next(-1);
    } else {
      this.addCommentHandler();
    }
  }

  arrowKeyPressedHandler(direction: KeyCodes) {
    const currentKeyboardSelectedResult =
      this.keyboardSelectedResultBs.getValue();
    let nextKeyboardSelectedResult = currentKeyboardSelectedResult;

    const maxValue = this.userList.length - 1;

    if (direction === KeyCodes.UP && currentKeyboardSelectedResult !== -1) {
      nextKeyboardSelectedResult = currentKeyboardSelectedResult - 1;
    } else if (
      direction === KeyCodes.DOWN &&
      currentKeyboardSelectedResult !== maxValue
    ) {
      nextKeyboardSelectedResult = currentKeyboardSelectedResult + 1;
    }

    this.keyboardSelectedResultBs.next(nextKeyboardSelectedResult);
  }
}
