import { NgModule } from '@angular/core';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import {
	MatCardModule,
	MatTableModule,
	MatSortModule,
	MatProgressBarModule,
	MatDividerModule,
	MatTabsModule,
	MatButtonModule
} from '@angular/material';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { HttpClient } from '@angular/common/http';

const imports = [
	MatCardModule,
	MatButtonModule,
	MatTableModule,
	MatSortModule,
	MatProgressBarModule,
	MatDividerModule,
	MatTabsModule
];
const declarations = [ DateAgoPipe, LoadingIndicatorComponent ];

@NgModule({
	declarations: [ ...declarations ],
	imports: [ ...imports ],
	exports: [ ...declarations, ...imports ],
	providers: [ HttpClient ]
})
export class SharedModule {}
