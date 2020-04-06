import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { CardDataSource } from '../datasource/card.datasource';
import { CardService } from '../services/card.service';
import { Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
 selector: 'app-cards',
 templateUrl: './cards.component.html',
 styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit, OnDestroy {
    public cardsDataSource: CardDataSource;
    public showProgress = false;
    public subscriptions: Subscription[] = [];
    public searchText: string;
    public cardItemSize = 500;
    public pageSize = 20;
    public rowSize = 4;
    @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
    constructor(private cardService: CardService) {
      this.cardsDataSource = new CardDataSource(this.cardService, this.pageSize, this.rowSize);
      this.subscriptions.push(this.cardsDataSource.onDataLoaded.subscribe(() => {this.showProgress = false; }));
      this.subscriptions.push(this.cardsDataSource.onDataLoading.subscribe(() => {this.showProgress = true; }));
    }

    public ngOnDestroy(): void {
        for (const s of this.subscriptions) {
            s.unsubscribe();
        }
        this.subscriptions = [];
    }
    public ngOnInit(): void {
        this.cardsDataSource.search();
    }

    public searchCards() {
        this.virtualScroll.scrollToIndex(0);
        this.cardsDataSource.term = this.searchText;
        this.cardsDataSource.search();
    }
}
