import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AutoState } from '@state/auto.reducers';

export const getAutoState = createFeatureSelector<AutoState>('auto');

export const getSmpError = createSelector(
  getAutoState,
  (state: AutoState) => state.error
);

export const getAllManufacturesResponse = createSelector(
  getAutoState,
  (state: AutoState) => state.allManufacturesResponse
);

export const getTableData = createSelector(
  getAutoState,
  (state: AutoState) => state.allManufacturesResponse?.Results
);

export const getAllManufacturesLoading = createSelector(
  getAutoState,
  (state: AutoState) => state.loading
);

export const getAllMakesResponse = createSelector(
  getAutoState,
  (state: AutoState) => state.allMakesResponse
);

export const getSelectedManufactureData = createSelector(
  getAutoState,
  (state: AutoState) => state.selectedManufactureData
);

export const getSelectedManufactureId = createSelector(
  getAutoState,
  (state: AutoState) => state.manufactureId
);
