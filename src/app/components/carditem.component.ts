import { Component, Input, ElementRef } from '@angular/core';
import { ICard } from '../models/ICard';

@Component({
    selector: 'app-card-item',
    templateUrl: './carditem.component.html',
    styleUrls:['./cards.component.scss'],
})
export class CardItemComponent {
    @Input()
    public model: ICard[];
}
