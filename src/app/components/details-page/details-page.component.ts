import { Router } from '@angular/router';
import { ApiResponse } from '@models/ApiResponse.model';
import {
  getSelectedManufactureData,
  getAllMakesResponse,
} from '@state/auto.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  selectedManufacture$ = this.store.select(getSelectedManufactureData);
  getAllMakesResponse$ = this.store.select(getAllMakesResponse);
  private destroy$ = new Subject();
  modelNames: string[] = [];
  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit(): void {
    combineLatest([this.selectedManufacture$, this.getAllMakesResponse$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([selectedManufacture, allMakesResponse]) => {
        if (selectedManufacture) {
          if (allMakesResponse) {
            this.getAllModelNames(allMakesResponse);
          }
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  private getAllModelNames(allMakesResponse: ApiResponse): void {
    allMakesResponse.Results.forEach((make) => {
      if (make.Make_Name) {
        this.modelNames.push(make.Make_Name);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
