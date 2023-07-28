import { CommentsListComponent } from './comments-list.component';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;

  beforeEach(() => {
    component = new CommentsListComponent();
    jest
      .spyOn(window, 'alert')
      .mockImplementation(() => console.log('alert called'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call the alert if a user is not mentioned', () => {
    component.userList = [{ name: 'Test', userID: 1 }];

    component.checkForUserMention('@Testing');

    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should call the alert if a user is mentioned', () => {
    component.userList = [{ name: 'Test', userID: 1 }];

    component.checkForUserMention('@Test');

    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Test was mentioned');
  });
});
