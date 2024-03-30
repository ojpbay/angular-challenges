import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities$ | async"
      [type]="cardType"
      customClass="bg-light-blue">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  get cities$(): Observable<City[]> {
    return this.store.cities$;
  }
}
