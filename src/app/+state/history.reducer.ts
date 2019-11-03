import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createAction, props, createReducer, on, ActionReducerMap, createFeatureSelector, createSelector, defaultMemoize } from '@ngrx/store';
import { AppState as RootState } from "./reducers";

export interface StudyDetail{
  studyUID: string
  nImgs:number
}
export interface Procedure{
  studyUID: string
  pName:string
}

export interface ReqProcFull{
  study: StudyDetail;
  proc: Procedure;
}

export interface SState extends EntityState<StudyDetail> {
}

export interface PState extends EntityState<Procedure> {
}

export interface State {
  studies: SState;
  procs: PState
}

export interface AppState extends RootState {
  patient_history: State
}

export const reducers: ActionReducerMap<State> = {
  studies: (state, action)=>_SReducer(state,action),
  procs: (state, action)=>_PReducer(state,action),
}

/** ================ action reducers =========== */
export const studyLoaded = createAction('[study] loaded', props<{ list: StudyDetail[] }>())
export const reload = createAction('[study] reload', props<{ list: StudyDetail[] }>())
export const addStudy = createAction('[study] add', props<StudyDetail>())
export const setImg = createAction('[study] set image no', props<[string,number]>())
export const spLoaded = createAction('[study & procedure] loaded', props<{ list: StudyDetail[], procs: Procedure[] }>())

const SAdapter = createEntityAdapter<StudyDetail>({ selectId: s => s.studyUID });
const sSelectors = SAdapter.getSelectors()
const _SReducer = createReducer(SAdapter.getInitialState(),
  on(studyLoaded, spLoaded, (state, { list }) => SAdapter.addAll(list, state)),
  on(reload, (state, { list }) => SAdapter.upsertMany(list, state)), //upsertMany doesn't respect order
  on(addStudy, (state, study) => SAdapter.upsertOne(study, state)),
  on(setImg, (state, [study, nn]) => SAdapter.updateOne({ id: study, changes: { nImgs: nn }}, state)),
)

const PAdapter = createEntityAdapter<Procedure>({ selectId: p => p.studyUID });
const pSelectors = PAdapter.getSelectors()
const _PReducer = createReducer(PAdapter.getInitialState(),
  on(spLoaded, (state, { procs }) => PAdapter.addAll(procs, state)),
)

/** ================= selectors ============== */
const getPh = createFeatureSelector<AppState, State>('patient_history')

const getStudies = createSelector(getPh, s=>s.studies)
const getProcs = createSelector(getPh, s=>s.procs)

export const getIds = createSelector(getStudies, sSelectors.selectIds)
const getSEntities = createSelector(getStudies, sSelectors.selectEntities)
const getPEntities = createSelector(getProcs, pSelectors.selectEntities)

export const getAllStudies = createSelector(getStudies, sSelectors.selectAll)

export const getItem = (id: string) => createSelector(getStudies, s => {
  console.log(`get item ${id}`);
  return sSelectors.selectEntities(s)[id]
})
//same behavior
export const getItem1 = (id: string) => createSelector(getSEntities, s => {
  // console.log(`get study entity ${id}`);
  return s[id]
})
export const getProc = (id: string) => createSelector(getPEntities, s => {
  // console.log(`get proc entity ${id}`);
  return s[id]
})

export const getItemFull0 = (id: string) => {
  const fac = toFull()

  return createSelector(getSEntities, getPEntities, (s, p) => {
    console.log(`get item full ${id}`);
    const study = s[id]
    const proc = p[id]
    const item: ReqProcFull = fac(study, proc)
    return item;
  })
}

const toFull = ()=>defaultMemoize((study, proc) => ({ study, proc})).memoized

export const getItemFull = (id: string) => createSelector(getItem1(id), getProc(id),
  (study, proc) => {
    console.log(`compose ${id}`);
    return { study, proc }
  })
