import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../state-management/app.state';
import { FetchRealEstateActions, FetchRealEstateForPoint } from '../../state-management/actions/fetch-real-estate-action';
import { Observable } from 'rxjs';
import { fetchPropertiesSelector } from 'src/app/state-management/selectors/fetch-real-estate-selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  latitude  = '-800.0782213';
  longitude = '26.8849731';
  xRadius = '175500000';
  properties$: Observable<any>;

  constructor( private store$: Store<AppState>) { }

  ngOnInit() {
    this.properties$ = this.store$
    .pipe(select(fetchPropertiesSelector));
  }

  findRealEstates(): void {
    this.store$.dispatch(
      new FetchRealEstateForPoint(
        this.latitude,
        this.longitude,
        this.xRadius
        ));
  }
}
