import { createAction, props } from '@ngrx/store';
import { ApiResponse, TableData } from '@models/ApiResponse.model';
export const GetAllManufactures = createAction('[Auto] Get All Manufactures');
export const GetAllManufacturesSuccess = createAction(
  '[Auto] Get All Manufactures Success',
  props<{ allManufacturesResponse: ApiResponse }>()
);

export const GetAllManufacturesError = createAction(
  '[Auto] Get All Manufactures Error',
  props<{ payload: any }>()
);

export const GetAllMakes = createAction(
  '[Auto] Get All Makes',
  props<{ id: string }>()
);

export const GetAllMakesSuccess = createAction(
  '[Auto] Get All Makes Success',
  props<{ allMakesResponse: ApiResponse }>()
);

export const GetAllMakesError = createAction(
  '[Auto] Get All Makes Error',
  props<{ payload: any }>()
);

export const GetSelectedManufactureData = createAction(
  '[Auto] Get Selected Manufacture Data',
  props<{ selectedManufactureData: TableData }>()
);

export const GetSelectedManufactureId = createAction(
  '[Auto] Get Selected Manufacture Id',
  props<{ manufactureId: string }>()
);
