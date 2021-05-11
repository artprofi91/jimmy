import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as autoActions from '@state/auto.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

@Injectable()
export class AutoEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}
  getManufactures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoActions.GetAllManufactures),
      mergeMap(() =>
        this.apiService.getManufactures().pipe(
          map((response) =>
            autoActions.GetAllManufacturesSuccess({
              allManufacturesResponse: response,
            })
          ),
          catchError((err) =>
            of(autoActions.GetAllManufacturesError({ payload: err }))
          )
        )
      )
    )
  );

  getMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoActions.GetAllMakes),
      mergeMap((action) =>
        this.apiService.getMakes(action.id).pipe(
          map((response) =>
            autoActions.GetAllMakesSuccess({
              allMakesResponse: response,
            })
          ),
          catchError((err) =>
            of(autoActions.GetAllMakesError({ payload: err }))
          )
        )
      )
    )
  );
}
