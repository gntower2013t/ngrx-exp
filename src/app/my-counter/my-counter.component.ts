import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable, EMPTY, combineLatest } from 'rxjs';
import { map, tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { increment, decrement, reset, getCntWId, toId, getCntWIdFac, getCounter, getCntIdFn, getCntIdFnxx, combineSelect } from '../+state/reducers';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCounterComponent implements OnInit {

  count$: Observable<string>;
  // count2$: Observable<string>;
  cnt$: Observable<string | number>;
  id$: Observable<string>;
  pp$: Observable<string>;
  xx$: Observable<string>;
  name$: Observable<string>;
  rand: number

  @Input() mark: string

  constructor(private store: Store<{ count: number }>,
    private route: ActivatedRoute
  ) {
    console.log("construct counter comp");
  }

  ngOnInit(): void {
    //data & param can from parent
    //never change
    this.id$ = this.route.data.pipe(
      map(data => data.id),
      // tap(x => console.log(`bind id ${x} ${this.mark}`)),
    );

    this.pp$ = this.route.paramMap.pipe(
      map(p => p.get('pp')),
      // tap(x => console.log(`child tap pp ${x} ${this.mark}`))
    )
    this.xx$ = this.route.paramMap.pipe(
      map(p => p.get('xx')),
      // tap(x => console.log(`child tap xx ${x} ${this.mark}`))
    )
      // .subscribe(_ => { })

    this.name$ = this.route.data
      .pipe(map(data => data.name));

    // const fac = getCntWIdFac()

    /*     this.count$ =
      store.pipe(
        // tap(x=>console.log("tap counters tate")),
        withLatestFrom(this.id$, (state, id) => getCntWId(state, id)),
        distinctUntilChanged(),
        tap(x=>console.log("tap counter with id: " + x))
    ) */

    //.selectWith
    this.count$ =
      this.store.pipe(
        select(getCntIdFn),
        withLatestFrom(this.id$, (fn, id) => fn(id)),
        // distinctUntilChanged(),
        map(r => r.res),
        tap(x => console.log(`tap counter with id: ${x} ${this.mark}`))
      );

/*  combineLatest(this.store.pipe(select(getCntIdFnxx)), this.pp$, this.xx$).pipe(
      map(([fn, pp, xx]) => fn(pp, xx)),
      distinctUntilChanged()
    ) */
    combineSelect(this.store, getCntIdFnxx, this.pp$, this.xx$)
      .subscribe(x => console.log(`combine pp ${x.res}`))

    /*     this.count2$ =
      store.pipe(
        withLatestFrom(this.id$),
        map(([state, id]) => getCntWId(state, id) + " - another"),
        distinctUntilChanged() //needed to avoid change detection
    ) */

    this.cnt$ = this.store.pipe(
      tap(_ => {
        this.rand = Math.random()
        console.log(`rand: ${this.rand}`);
      }),
      select(getCntWId, 'a') //select can distinct by default
      // map(getCounter)
    )
  }

  ngDoCheck() {
    // console.log(`check MyCounterComponent`);
  }

  check() {
    console.warn(`counter view checked ${this.mark}`);
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
