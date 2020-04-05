import { Component, OnInit, OnDestroy} from '@angular/core';
import { CardDataSource } from '../datasource/card.datasource';
import { CardService } from '../services/card.service';
import { Subscription } from 'rxjs';

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
    constructor(private cardService: CardService) {
      this.cardsDataSource = new CardDataSource(cardService, this.pageSize, this.rowSize);
      this.subscriptions.push(this.cardsDataSource.onDataLoaded.subscribe(() => {this.showProgress = false; }));
      this.subscriptions.push(this.cardsDataSource.onDataLoading.subscribe(() => {this.showProgress = true; }));
    }

    ngOnDestroy(): void {
        for (const s of this.subscriptions) {
            s.unsubscribe();
        }
        this.subscriptions = [];
    }
    ngOnInit(): void {
        this.cardsDataSource.preLoad();
    }

    public searchCards() { 
        this.cardsDataSource.search(this.searchText);
    }
}
