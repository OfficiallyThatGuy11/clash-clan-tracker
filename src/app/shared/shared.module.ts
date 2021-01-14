import { NgModule } from '@angular/core';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import {
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatProgressBarModule,
  MatDividerModule,
  MatTabsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatSliderModule,
  MatSelectModule,
} from '@angular/material';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WinLossChartComponent } from './components/win-loss-chart/win-loss-chart.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { SharedScatterChartComponent } from './components/shared-scatter-chart/shared-scatter-chart.component';

const imports = [
  BrowserModule,
  CommonModule,
  BrowserAnimationsModule,
  HttpClientModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatProgressBarModule,
  MatDividerModule,
  MatTabsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatSliderModule,
  ChartsModule,
];
const declarations = [
  DateAgoPipe,
  LoadingIndicatorComponent,
  WinLossChartComponent,
  LineChartComponent,
  TextInputComponent,
  RadarChartComponent,
  SharedScatterChartComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
  providers: [HttpClient],
})
export class SharedModule {}
