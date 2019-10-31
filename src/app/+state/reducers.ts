import { createAction, createReducer, on, props, createSelector, createFeatureSelector, defaultMemoize } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

//purpose ?? only internal??
export const add = createAction('[counter] add', { _as: "props", _p: { add: 5 } })
const action = add({ add: 3 })
console.log(action.add); //3


const add2 = createAction('[counter] add', props<{ add: number }>())
const action2 = add2({ add: 5 })
console.log(action2.add);


//function, must return object ??
const add3 = createAction('[counter] add', (n: number) => ({ id: n + 1 }))
const action3 = add3(5)
console.log(action3.id); //6


/** ================== reducer =============== */
export const initialState = 0;

export interface AppState {
  count: number;
}

//on accept ...actions
const _counterReducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, state => 0),
  //type infer C[number]
  on(add, add2, (state, { add }) => state + add),
);

export function counterReducer(state: number, action) {
  return _counterReducer(state, action);
}


/** ==================== effects ================ */
/* import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
const action$: Actions = null;
createEffect(() => action$.pipe(ofType(add),
  map(a => add2({ add: a.add })) //type infer, no need to declare generic type <>
), { dispatch: false }) */


/** ============= selectors ================ */
export const getCounter = createFeatureSelector<AppState, number>('count')

export const getCntWP = createSelector(getCounter, (cnt, props) => {
  console.log(`test memoized ${cnt}`);
  return cnt + props.id
})

export const getCntWId = createSelector(getCounter, (cnt, id: string) => {
  console.log(`test memoized ${cnt}`);
  return cnt + id
})

export const getCntWIdFac = () => createSelector(getCounter, (cnt, id) => {
  console.log(`test fac memoized ${cnt}`);
  return cnt + id
})

export const toId = defaultMemoize(id => {
  console.log(`toid memoized ${id}`);
  return { id }
}).memoized
