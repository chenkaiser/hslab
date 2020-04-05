import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './services/card.service';
import { CardsComponent } from './components/cards.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CardItemComponent } from './components/carditem.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    HttpClientModule,
    ClarityModule,
    FormsModule,
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
