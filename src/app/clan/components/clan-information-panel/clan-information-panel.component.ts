import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'clan-information-panel',
	templateUrl: './clan-information-panel.component.html',
	styleUrls: [ './clan-information-panel.component.scss' ]
})
export class ClanInformationPanelComponent implements OnInit {
	@Input() clan: Clan;

	constructor() {}

	ngOnInit() {}
}
