import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../state-management/app.state';
import { Property } from 'src/app/interfaces/geo-json-interfaces';
import { Router } from '@angular/router';
import { FetchRealEstateDetail } from 'src/app/state-management/actions/fetch-real-estate-action';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {

  @Input() property: Property;
  @Input() show: boolean;
  isError: boolean;

  imageLoader = true;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
  }

  getImgUrl(): string {
    if (this.property && this.property.img) {
      if (this.property.img === 'Error') {
        this.isError = true;
        return '';
      }
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.property.img) as string;
    }
    return '';
  }

  navigateToDetails(): void {
    this.store$.dispatch(new FetchRealEstateDetail(this.property.propertyId, '100000'));
    this.router.navigate(['', this.property.propertyId]);
  }

}
