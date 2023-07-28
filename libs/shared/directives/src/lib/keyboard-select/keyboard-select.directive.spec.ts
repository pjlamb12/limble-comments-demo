import { DestroyRef, ElementRef } from '@angular/core';
import { KeyboardSelectDirective } from './keyboard-select.directive';

describe('KeyboardSelectDirective', () => {
  let directive: KeyboardSelectDirective;
  let mockElementRef: ElementRef;
  let mockDestroyRef: DestroyRef;

  beforeEach(() => {
    directive = new KeyboardSelectDirective(mockElementRef, mockDestroyRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
