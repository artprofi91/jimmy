import { ActionReducerMap } from '@ngrx/store';
import * as reducers from '@state/auto.reducers';

export interface AppState {
  auto: reducers.AutoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auto: reducers.autoReducer,
};
