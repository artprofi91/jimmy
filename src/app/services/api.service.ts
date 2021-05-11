import { ALL_MANUFACTURES, ALL_MAKES } from '@shared/constants';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '@models/ApiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getManufactures(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(ALL_MANUFACTURES)
      .pipe(
        catchError(this.handleError<ApiResponse>('getManufactures', undefined))
      );
  }

  getMakes(ID: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(ALL_MAKES + ID + '?format=json')
      .pipe(catchError(this.handleError<ApiResponse>('getMakes', undefined)));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
