import { createReducer, on } from '@ngrx/store';
import { ApiResponse, TableData } from '@models/ApiResponse.model';
import * as fromActions from '@state/auto.actions';

export interface AutoState {
  manufactureId: string | undefined;
  allManufacturesResponse: ApiResponse | undefined;
  allMakesResponse: ApiResponse | undefined;
  selectedManufactureData: TableData | undefined;
  loading: boolean;
  error: any;
}

export const AutoInitialState: AutoState = {
  manufactureId: undefined,
  allManufacturesResponse: undefined,
  allMakesResponse: undefined,
  selectedManufactureData: undefined,
  loading: false,
  error: null,
};

const _autoReducer = createReducer(
  AutoInitialState,
  on(fromActions.GetAllManufactures, (state) => ({ ...state, loading: true })),
  on(
    fromActions.GetAllManufacturesSuccess,
    (state, { allManufacturesResponse }) => ({
      ...state,
      loading: false,
      allManufacturesResponse: { ...allManufacturesResponse },
    })
  ),

  on(fromActions.GetAllManufacturesError, (state, { payload }) => ({
    ...state,
    loading: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  })),
  on(fromActions.GetAllMakes, (state) => ({ ...state })),

  on(fromActions.GetAllMakesSuccess, (state, { allMakesResponse }) => ({
    ...state,
    allMakesResponse: { ...allMakesResponse },
  })),

  on(fromActions.GetAllMakesError, (state, { payload }) => ({
    ...state,
    loading: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  })),
  on(
    fromActions.GetSelectedManufactureData,
    (state, { selectedManufactureData }) => ({
      ...state,
      selectedManufactureData: { ...selectedManufactureData },
      manufactureId: String(selectedManufactureData.ID),
    })
  )
);

export function autoReducer(state: any, action: any) {
  return _autoReducer(state, action);
}
