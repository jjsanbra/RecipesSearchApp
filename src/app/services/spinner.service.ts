import { Injectable } from '@angular/core';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';

import { Subject } from 'rxjs';
import { scan, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
  private spinnerTopRef = this.cdkSpinnerCreate();
  public spin$: Subject<boolean> = new Subject();

  constructor(
    private overlay: Overlay,
  ) {
    this.spin$
      .asObservable()
      .pipe(
        map( val => val ? 1 : -1 ),
        scan( ( acc, one ) => (acc + one) >= 0 ? acc + one : 0, 0 )
      )
      .subscribe(
        ( res ) => {
          if ( res === 1 ) {
            this.showSpinner();
          } else if ( res === 0 ) {
            // tslint:disable-next-line: no-unused-expression
            this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
          }
        }
      );
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  private showSpinner() {
    this.spinnerTopRef.attach( new ComponentPortal( MatSpinner ) );
  }

  private stopSpinner() {
    this.spinnerTopRef.detach();
  }
}
