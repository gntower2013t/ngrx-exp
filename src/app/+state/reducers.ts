import { createAction, createReducer, on, props } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

//purpose ?? only internal??
const add = createAction('[counter] add', { _as: "props", _p: { add: 5 } })
const action = add({ add: 3 })
console.log(action.add);


const add2 = createAction('[counter] add', props<{ add: number }>())
const action2 = add2({ add: 5 })
console.log(action2.add);


//function, must return object ??
const add3 = createAction('[counter] add', (n: number) => ({ id: n + 1 }))
const action3 = add3(5)
console.log(action3.id);

/** reducer */
export const initialState = 0;

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
