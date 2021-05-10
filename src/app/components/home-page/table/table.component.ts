import { ApiResponse, TableData, Results } from '@models/ApiResponse';
import { Component, OnInit } from '@angular/core';
import { VIEW_DETAILS, COLUMNS } from '@shared/constants';
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

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
  btnText = VIEW_DETAILS;
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getManufactures();
    if (!this.isLoading) {
      this.dataSource = this.getTableData(this.start, this.end);
      this.updateIndex();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getManufactures(): void {
    this.apiService
      .getManufactures()
      .pipe(takeUntil(this.destroy$))
      .subscribe((manufactures: ApiResponse) => {
        const tableData: TableData[] = [];
        manufactures.Results.forEach((manufacture: Results) => {
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
        this.isLoading = false;
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
    this.apiService
      .getMakes(String(row.ID))
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
