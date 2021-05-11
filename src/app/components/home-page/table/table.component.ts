import { Router } from '@angular/router';
import { TableData, Results } from '@models/ApiResponse.model';
import { Component, OnInit } from '@angular/core';
import { VIEW_DETAILS, COLUMNS, DETAIL_PATH } from '@shared/constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  getTableData,
  getAllManufacturesLoading,
  getAllMakesResponse,
} from '@state/auto.selectors';
import {
  GetAllMakes,
  GetAllManufactures,
  GetSelectedManufactureData,
} from '@state/auto.actions';
import { AppState } from '@state/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private destroy$ = new Subject();
  displayedColumns = COLUMNS;
  dataSource: TableData[] = [];
  start = 0;
  limit = 15;
  end = this.limit + this.start;
  btnViewText = VIEW_DETAILS;
  loading$ = this.store.select(getAllManufacturesLoading);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(GetAllManufactures());
    this.getManufactures();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getManufactures(): void {
    this.store
      .select(getTableData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((manufactures: Results[] | undefined) => {
        const tableData: TableData[] = [];
        manufactures?.forEach((manufacture: Results) => {
          const { Country, Mfr_CommonName, Mfr_ID } = manufacture;
          const formattedManufacture: any = {
            ID: String(Mfr_ID),
            'Common Name': Mfr_CommonName,
            Country,
          };
          tableData.push(formattedManufacture);
          this.dataSource = tableData.filter(
            (manufacture) => manufacture['Common Name']
          );
        });
        this.dataSource = this.getTableData(this.start, this.end);
        this.updateIndex();
      });
  }

  onTableScroll(e: Event): void {
    const tableViewHeight = (e.target as HTMLInputElement).offsetHeight; // viewport
    const tableScrollHeight = (e.target as HTMLInputElement).scrollHeight; // length of all table
    const scrollLocation = (e.target as HTMLInputElement).scrollTop; // how far user scrolled
    // if the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      let data = this.getTableData(this.start, this.end);
      //make table infinite
      this.dataSource = this.dataSource.concat(data);
      this.updateIndex();
    }
  }

  getTableData(start: number, end: number): TableData[] {
    return this.dataSource.filter(
      (value, index) => index >= start && index < end
    );
  }

  private updateIndex(): void {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  viewDetails(row: TableData): void {
    // !TODO combine 2 dispatch on the effect side
    this.store.dispatch(
      GetSelectedManufactureData({ selectedManufactureData: row })
    );
    this.store.dispatch(GetAllMakes({ id: String(row.ID) }));
    this.router.navigate([DETAIL_PATH]);
  }
}
