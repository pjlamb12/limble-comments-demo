import { CommentDisplayComponent } from './comment-display.component';

describe('CommentDisplayComponent', () => {
  let component: CommentDisplayComponent;

  beforeEach(() => {
    component = new CommentDisplayComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight the match correctly', () => {
    component.userList = [{ name: 'Test', userID: 1 }];
    component.comment = { message: '@Test' };

    expect(component.formattedString).toEqual(
      '<span class="mention-text">@Test</span>'
    );
  });

  it('should not highlight the text if it has no match', () => {
    component.userList = [{ name: 'Test', userID: 1 }];
    component.comment = { message: '@Testing' };

    expect(component.formattedString).toEqual('@Testing');
  });
});
