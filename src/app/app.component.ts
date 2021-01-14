import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'clash-clan-tracker';
  isMobile = false;

  ngOnInit(): void {
    this.getIsMobile();
  }

  getIsMobile() {
    const match = window.matchMedia;
    if (match) {
      this.isMobile = !!match('(pointer:coarse)');
    } else {
      this.isMobile = false;
    }
  }
}
