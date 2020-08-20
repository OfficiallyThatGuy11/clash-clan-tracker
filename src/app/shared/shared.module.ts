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
	MatButtonToggleModule
} from '@angular/material';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WinLossChartComponent } from './components/win-loss-chart/win-loss-chart.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
	MatFormFieldModule,
	MatInputModule,
	MatButtonToggleModule,
];
const declarations = [
	DateAgoPipe,
	LoadingIndicatorComponent,
	WinLossChartComponent
];

@NgModule({
	declarations: [ ...declarations, WinLossChartComponent ],
	imports: [ ...imports ],
	exports: [ ...declarations, ...imports ],
	providers: [ HttpClient ]
})
export class SharedModule {}
