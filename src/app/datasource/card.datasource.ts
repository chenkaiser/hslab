import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ICard } from '../models/ICard';
import { CardService } from '../services/card.service';
import { EventEmitter } from '@angular/core';
import { IRow } from '../models/IRow';

export class CardDataSource extends DataSource<IRow | undefined> {
    private cachedCards = Array.from<IRow>({ length: 0 });
    private dataStream = new BehaviorSubject<(IRow | undefined)[]>(this.cachedCards);
    private subscription = new Subscription();
    private pageSize = 0;
    private lastPage = 0;
    public onDataLoading: EventEmitter<any> = new EventEmitter();
    public onDataLoaded: EventEmitter<any> = new EventEmitter();
    public rowSize = 0;
    public term: string;
    constructor(private cardService: CardService, pgSize: number, rwSize: number) {
        super();
        this.pageSize = pgSize;
        this.rowSize = rwSize;
    }

    public search() {
       this.lastPage = 0;
       this.cachedCards = [];
       this.fetchNewPage();
    }

    public connect(collectionViewer: CollectionViewer): Observable<(IRow | undefined)[] | ReadonlyArray<IRow | undefined>> {
        this.subscription.add(collectionViewer.viewChange.subscribe(range => {
            const currentPage = Math.floor(range.end / (this.pageSize / this.rowSize));
            if (currentPage > this.lastPage) {
                this.lastPage = currentPage;
                this.fetchNewPage();
            }
        }));
        return this.dataStream;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.subscription.unsubscribe();
    }

    private fetchNewPage(): void {
            this.onDataLoading.emit({});
            this.cardService.searchCards(this.term, this.pageSize, this.lastPage, this.rowSize).subscribe(res => {
                this.cachedCards = this.cachedCards.concat(res);
                this.dataStream.next(this.cachedCards);
                this.onDataLoaded.emit({});
            });
    }
}
