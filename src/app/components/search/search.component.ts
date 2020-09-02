import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClanService } from 'src/app/clan/services/clan.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fadeExpandHeight } from 'src/app/animations/fadeExpandHeight.animation';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fadeExpandHeight],
})
export class SearchComponent implements OnInit {
  inputEmpty = true;
  inputValid = true;

  searchTerm = '';
  searchValueSubject = new Subject<string>();
  searchValueSubscription: Subscription;
  searchValueDebounceSubscription: Subscription;
  searchResultsSubscription: Subscription;

  hideAllResults = true;
  displayRecentClans = false;
  displaySearchResults = false;

  recentlyVisitedClans: Array<Clan>;

  searchResults: Array<Clan>;
  currentPage: Array<Clan>;
  currentPageNumber: number;

  constructor(
    private clanService: ClanService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchValueDebounceSubscription = this.searchValueSubject
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.getSearchResults();
      });
  }

  clearInput(): void {
    this.searchTerm = '';
    this.displaySearchResults = false;
    this.displayRecentClans = false;
  }

  searchKeyupEvent(event: any): void {
    const value = event.target.value;

    if (value === this.searchTerm) {
      return;
    }

    this.searchTerm = value;

    this.displaySearchResults = false;
    this.displayRecentClans = false;
    this.changeDetector.detectChanges();
    this.getRecentlyVisitedClans(value);

    if (event.code === 'Enter') {
      this.getSearchResults();
    } else {
      this.searchValueSubject.next(value);
    }
  }

  searchResultsAnimationEvent(event: AnimationEvent): void {
    if (event.toState === 'hide' && !this.displaySearchResults) {
      this.searchResults = undefined;
      this.currentPage = undefined;
    }
  }

  recentClansAnimationEvent(event: AnimationEvent): void {
    if (event.toState === 'hide' && !this.displayRecentClans) {
      this.recentlyVisitedClans = undefined;
    }
  }

  validateInput(): void {
    this.inputValid = true;
    if (this.searchTerm.length === 0) {
      this.inputEmpty = true;
    } else {
      this.inputEmpty = false;
      if (this.searchTerm.length < 3) {
        this.inputValid = false;
      }
      if (this.searchTerm.length > 30) {
        this.inputValid = false;
      }
    }
  }

  getSearchResults(): void {
    this.validateInput();
    if (this.inputValid && !this.inputEmpty) {
      if (
        this.searchResultsSubscription &&
        !this.searchResultsSubscription.closed
      ) {
        this.searchResultsSubscription.unsubscribe();
        this.searchResultsSubscription = undefined;
      }
      this.searchResultsSubscription = this.clanService
        .searchClansByName(this.searchTerm)
        .subscribe((clans) => {
          this.searchResults = clans;
          if (this.searchResults.length) {
            this.selectPage(1);
          } else {
            this.displaySearchResults = true;
          }
        });
    }
  }

  selectPage(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * 10;
    this.currentPage = [...this.searchResults].slice(
      startIndex,
      startIndex + 10
    );
    this.changeDetector.detectChanges();
    this.displaySearchResults = true;
  }

  navigateToClan(tag: string): void {
    this.router.navigateByUrl(`clan/${tag}`);
    this.hideAllResults = true;
  }

  getRecentlyVisitedClans(searchTerm: string): void {
    const recentlyVisitedClans = this.clanService.getRecentlyVisitedClans();
    this.recentlyVisitedClans = recentlyVisitedClans.filter(
      (term) => term.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    if (this.recentlyVisitedClans.length) {
      this.displayRecentClans = true;
    } else {
      this.displayRecentClans = false;
    }
  }

  removeClanFromRecentlyVisitedClans(clan: Clan): void {
    this.clanService.removeClanFromRecentlyVisitedClans(clan);
    this.getRecentlyVisitedClans(this.searchTerm);
  }
}
