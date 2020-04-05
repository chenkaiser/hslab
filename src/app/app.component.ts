import { Component } from '@angular/core';
import { CardDataSource } from './datasource/card.datasource';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hslab';
 

  ngOnInit(){
  }
}
