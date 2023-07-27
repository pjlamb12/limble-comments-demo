import {
  AfterContentInit,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyCodes, wasAtKeyPressed } from '@limble-demo/shared/util';
import { fromEvent, tap, distinctUntilChanged } from 'rxjs';

@Directive({
  selector: '[ldKeyboardSelect]',
  standalone: true,
})
export class KeyboardSelectDirective implements AfterContentInit {
  @Output() directionArrowPressed: EventEmitter<KeyCodes> =
    new EventEmitter<KeyCodes>();
  @Output() enterKeyPressed: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() atKeyPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() escKeyPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private element: ElementRef, private _destroyRef: DestroyRef) {}

  ngAfterContentInit() {
    fromEvent<KeyboardEvent>(this.element.nativeElement, 'keyup')
      .pipe(
        tap((ev: KeyboardEvent) => {
          if (ev.code === KeyCodes.DOWN || ev.code === KeyCodes.UP) {
            ev.preventDefault();
            this.directionArrowPressed.emit(ev.code);
          } else if (ev.code === KeyCodes.ENTER) {
            ev.preventDefault();
            this.enterKeyPressed.emit(true);
          } else if (wasAtKeyPressed(ev)) {
            ev.preventDefault();
            this.atKeyPressed.emit(true);
          } else if (ev.code === KeyCodes.ESC) {
            this.escKeyPressed.emit(true);
          }
        }),
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
