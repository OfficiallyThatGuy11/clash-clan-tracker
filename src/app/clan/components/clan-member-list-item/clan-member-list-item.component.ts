import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'clan-member-list-item',
	templateUrl: './clan-member-list-item.component.html',
	styleUrls: [ './clan-member-list-item.component.scss' ]
})
export class ClanMemberListItemComponent implements OnInit {
	@Input() member: ClanMember;
	@ViewChild('memberNameElement') memberNameElement: ElementRef;
	rankChangeIcon: 'arrow_upward' | 'arrow_downward' | 'Equal';
	rankChangeDifference;
	memberNameTooBig = false;

	componentReady = false;

	constructor() {}

	ngOnInit() {}

	ngAfterViewInit(): void {
		this.checkIfMemberNameIsTooBig();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['member']) {
			if (this.member.clanRank < this.member.previousClanRank) {
				this.rankChangeIcon = 'arrow_upward';
				this.rankChangeDifference = this.member.previousClanRank - this.member.clanRank;
			} else if (this.member.clanRank > this.member.previousClanRank) {
				this.rankChangeIcon = 'arrow_downward';
				this.rankChangeDifference = this.member.clanRank - this.member.previousClanRank;
			}
		}
	}

	onResize(event: any): void {
		this.checkIfMemberNameIsTooBig();
	}

	checkIfMemberNameIsTooBig(): void {
		this.memberNameTooBig =
			this.memberNameElement.nativeElement.scrollWidth > this.memberNameElement.nativeElement.clientWidth;
	}
}
