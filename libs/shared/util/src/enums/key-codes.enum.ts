export enum KeyCodes {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  ESC = 'Escape',
  ENTER = 'Enter',
  SPACE = 'Space',
  DIGIT2 = 'Digit2',
}

export function wasAtKeyPressed(evt: KeyboardEvent) {
  return evt.code === KeyCodes.DIGIT2 && evt.shiftKey;
}
