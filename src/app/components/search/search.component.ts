import { Component, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ClanService } from 'src/app/clan/services/clan.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fadeExpandHeight } from 'src/app/animations/fadeExpandHeight.animation';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fadeExpandHeight]
})
export class SearchComponent implements OnInit {
  inputEmpty = true;
  inputValid = true;
  
  searchTerm = '';
  searchValueSubject = new Subject<string>();
  searchValueSubscription: Subscription;
  searchValueDebounceSubscription: Subscription;
  searchResultsSubscription: Subscription;

  searchResults: Array<Clan>;
  currentPage: Array<Clan>;
  currentPageNumber: number;
  displaySearchResults = false;
  

  constructor(private clanService: ClanService, private router: Router, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchValueDebounceSubscription = this.searchValueSubject.pipe(debounceTime(500)).subscribe((value) => {
      this.getSearchResults(value);
    });
  }
  
  searchKeyupEvent(event: KeyboardEvent): void {
    const value = event.target['value'];

    if (value === this.searchTerm) {
      return;
    }

    this.displaySearchResults = false;
    this.changeDetector.detectChanges();
    this.searchResults = undefined;
    this.currentPage = undefined;

    if (event.code === 'Enter') {
      this.getSearchResults(value);
    } else {
      this.searchValueSubject.next(value);
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
  
  getSearchResults(searchTerm: string): void {
    if (searchTerm === this.searchTerm) {
      return;
    }

    this.searchTerm = searchTerm;
    this.validateInput();
    if (this.inputValid && !this.inputEmpty) {
      if (this.searchResultsSubscription && !this.searchResultsSubscription.closed) {
        this.searchResultsSubscription.unsubscribe();
        this.searchResultsSubscription = undefined;
      }
      this.searchResultsSubscription = this.clanService.searchClansByName(this.searchTerm).subscribe(clans => {
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
    this.currentPage = [...this.searchResults].slice(startIndex, startIndex + 10);
    this.changeDetector.detectChanges();
    this.displaySearchResults = true;
  }

  navigateToClan(tag: string): void {
    this.router.navigateByUrl(`clan/${tag}`);
    this.displaySearchResults = false;
  }
}
