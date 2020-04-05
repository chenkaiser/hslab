import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { ICard } from '../models/ICard';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { IRow } from '../models/IRow';

export class Endpoints {
    public static readonly CARDS_LOAD = (pageSize, pageIndex) =>
        `https://api.elderscrollslegends.io/v1/cards?pageSize=${pageSize}&page=${pageIndex}`
}

@Injectable()
export class CardService {
    constructor(private httpClient: HttpClient) { }
    public getCards(pageSize: number, pageIndex: number, rowSize: number): Observable<IRow[]> {
        return this.httpClient.get(Endpoints.CARDS_LOAD(pageSize, pageIndex))
        .pipe(map((res) => this.toIRows(res, rowSize)), catchError(this.handleError));
    }

    public searchCards(term: string, pageSize: number, pageIndex: number, rowSize: number) {
        const termUrl = encodeURI(term);
        const url = Endpoints.CARDS_LOAD(pageSize, pageIndex) + `&name=${termUrl}`;
        return this.httpClient.get(url)
        .pipe(map((res) => this.toIRows(res, rowSize)), catchError(this.handleError));
    }

    private toIRows(data: any, rowSize: number): IRow[] {
        console.log(data);
        const rows = [];
        let currentRow = {cards: []};
        rows.push(currentRow);
        let count = 0;
        for (const c of data.cards) {
            if (count === rowSize) {
                currentRow = {cards: []};
                rows.push(currentRow);
                count = 0;
            }
            currentRow.cards.push({
                Image: c.imageUrl,
                Name: c.name,
                Text: c.text,
                SetName: c.set.name,
                Type: c.type,
            });
            count ++;
        }
        return rows;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
