import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, EMPTY, pipe } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { increment, decrement, reset, getCntWId, toId, getCntWIdFac } from '../+state/reducers';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterComponent implements OnInit {

  count$: Observable<string>;
  count2$: Observable<string>;
  id$: Observable<string>;
  name$: Observable<string>;

  constructor(private store: Store<{ count: number }>,
    private route: ActivatedRoute
  ) {
    console.log("construct counter comp");

    this.id$ = this.route.data
      .pipe(map(data => data.id));

    this.name$ = this.route.data
      .pipe(map(data => data.name));

    // const fac = getCntWIdFac()

    this.count$ =
      store.pipe(
        withLatestFrom(this.id$, (state, id) => getCntWId(state, id)),
    )

    this.count2$ =
      store.pipe(
        withLatestFrom(this.id$),
        map(([state, id]) => getCntWId(state, id) + " - another")
    )

  }

  ngOnInit(): void {

  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}
