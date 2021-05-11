import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomePageComponent, TableComponent],
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class HomePageModule {}
