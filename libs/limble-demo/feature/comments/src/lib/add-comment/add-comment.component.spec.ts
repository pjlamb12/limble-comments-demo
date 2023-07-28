import { FormBuilder } from '@angular/forms';
import { AddCommentComponent } from './add-comment.component';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  const mockFormBuilder = new FormBuilder();

  beforeEach(() => {
    component = new AddCommentComponent(mockFormBuilder);
    component.userList = [{ name: 'Test', userID: 1 }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
