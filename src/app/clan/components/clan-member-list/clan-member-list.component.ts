import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'clan-member-list',
  templateUrl: './clan-member-list.component.html',
  styleUrls: ['./clan-member-list.component.scss']
})
export class ClanMemberListComponent implements OnInit {
  @Input() clanMembers: Array<ClanMember>;

  constructor() { }

  ngOnInit() {
  }

}
