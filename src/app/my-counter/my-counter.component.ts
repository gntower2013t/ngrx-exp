import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, EMPTY, pipe } from 'rxjs';
import { map, tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { increment, decrement, reset, getCntWId, toId, getCntWIdFac, getCounter } from '../+state/reducers';
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
  cnt$: Observable<string|number>;
  id$: Observable<string>;
  name$: Observable<string>;
  rand:number

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
        // tap(x=>console.log("tap counters tate")),
        withLatestFrom(this.id$, (state, id) => getCntWId(state, id)),
        distinctUntilChanged(),
        tap(x=>console.log("tap counter with id: " + x))
    )

    this.count2$ =
      store.pipe(
        withLatestFrom(this.id$),
        map(([state, id]) => getCntWId(state, id) + " - another"),
        distinctUntilChanged() //needed to avoid change detection
    )

    this.cnt$ = store.pipe(
      tap(_ => {
        this.rand = Math.random()
        console.log(`rand: ${this.rand}`);
      }),
      select(getCntWId, 'a') //select can distinct by default
      // map(getCounter)
    )

  }

  ngOnInit(): void {

  }

  ngDoCheck() {
    // console.log(`check MyCounterComponent`);
  }

  check() {
    console.warn('counter view checked');
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
