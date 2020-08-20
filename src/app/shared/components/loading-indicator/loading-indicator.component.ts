import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'shared-loading-indicator',
	templateUrl: './loading-indicator.component.html',
	styleUrls: [ './loading-indicator.component.scss' ]
})
export class LoadingIndicatorComponent implements OnInit {
	@Input() verticalMargin = true;

	constructor() {}

	ngOnInit() {}
}
