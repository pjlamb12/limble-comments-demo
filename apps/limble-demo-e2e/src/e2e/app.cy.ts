describe('limble-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should show the comments list', () => {
    cy.get('[data-cy=comments-list]').should('exist').and('be.visible');
    cy.get('[data-cy=comments-list] li').should('have.length', 3);
  });

  it('should add a simple comment', () => {
    cy.get('[data-cy=comment-input]').type('This is a new comment{enter}');
    cy.get('[data-cy=comments-list] li').should('have.length', 4);
    cy.get('[data-cy=comment-input]').type('This is a new comment');
    cy.get('[data-cy=add-comment-button]').click();
    cy.get('[data-cy=comments-list] li').should('have.length', 5);
  });

  it('should add a comment mentioning a user by clicking on the user', () => {
    cy.get('[data-cy=comment-input]').type('I will mention {shift}@');
    cy.get('[data-cy=mention-user-list]').should('be.visible');
    cy.get('[data-cy=mention-user-list] li').eq(0).click();
    cy.get('[data-cy=mention-user-list]').should('not.exist');
    cy.get('[data-cy=comment-input]').should(
      'have.value',
      'I will mention @Kevin'
    );
    cy.get('[data-cy=add-comment-button]').click();
    cy.get('[data-cy=comments-list] li').should('have.length', 4);
    cy.get('[data-cy=comments-list] li [data-cy=comment-display] span')
      .last()
      .should('include.text', '@Kevin');
  });

  it('should add a comment mentioning a user by using the keyboard', () => {
    cy.get('[data-cy=comment-input]').type('I will mention {shift}@');
    cy.get('[data-cy=mention-user-list]').should('be.visible');
    cy.get('[data-cy=comment-input]').type('{downArrow}');
    cy.get('[data-cy=comment-input]').type('{enter}');
    cy.get('[data-cy=mention-user-list]').should('not.exist');
    cy.get('[data-cy=comment-input]').should(
      'have.value',
      'I will mention @Jeff'
    );
    cy.get('[data-cy=comment-input]').type('{enter}');
    cy.get('[data-cy=comments-list] li').should('have.length', 4);
    cy.get('[data-cy=comments-list] li [data-cy=comment-display] span')
      .last()
      .should('include.text', '@Jeff');
  });

  it.only('should filter the user list if the user types after the @', () => {
    cy.get('[data-cy=comment-input]').type('I will mention {shift}@j');
    cy.get('[data-cy=mention-user-list]').should('be.visible');
    cy.get('[data-cy=mention-user-list] li').should('have.length', 1);
    cy.get('[data-cy=comment-input]').type('{enter}');
    cy.get('[data-cy=mention-user-list]').should('not.exist');
    cy.get('[data-cy=comment-input]').should(
      'have.value',
      'I will mention @Jeff'
    );
    cy.get('[data-cy=comment-input]').type('{enter}');
    cy.get('[data-cy=comments-list] li').should('have.length', 4);
    cy.get('[data-cy=comments-list] li [data-cy=comment-display] span')
      .last()
      .should('include.text', '@Jeff');
  });
});
