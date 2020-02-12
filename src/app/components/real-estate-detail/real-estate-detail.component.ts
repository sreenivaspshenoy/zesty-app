import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../state-management/app.state';
import { Property } from 'src/app/interfaces/geo-json-interfaces';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { fetchPropertiesSelector, fetchOverlayedImageSelector } from 'src/app/state-management/selectors/fetch-real-estate-selector';
import { flatMap, switchMap, } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ToggleOverlayAction } from 'src/app/state-management/actions/fetch-real-estate-action';


@Component({
  selector: 'app-real-estate-detail',
  templateUrl: './real-estate-detail.component.html',
  styleUrls: ['./real-estate-detail.component.css']
})
export class RealEstateDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  public realEstateId: string;
  public selectedPropertyObs$: Observable<Property>;
  subscription: Subscription;
  overlayedImg: any = null;
  displayOverlayedImg = false;

  constructor( private store$: Store<AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.realEstateId = params['realEstateId'];
    });
    this.selectedPropertyObs$ = this.store$.pipe(
      select(fetchPropertiesSelector),
      switchMap((properties) => {
        return properties.filter(property => property.propertyId == this.realEstateId);
      })
    );
    if (this.realEstateId) {
      this.getOverLayedImg();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getOverLayedImg() {
    this.store$.dispatch(new ToggleOverlayAction(this.realEstateId));
    this.store$.pipe(select(fetchOverlayedImageSelector(this.realEstateId))).subscribe(overlayProperty => {
      if (overlayProperty) {
        this.overlayedImg = overlayProperty;
      }
    });
  }

  getImgUrl(property): string {
    if (this.displayOverlayedImg) {
      if (this.overlayedImg) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.overlayedImg) as string;
      }
    } else {
      if (property && property.img) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(property.img) as string;
      }
    }
    return '';
  }

  getBufferDistance(property: Property): string {
    if (property && property.propertyStats) {
      return Object.keys(property.propertyStats)[0];
    }
  }

  getZoneDensity(property: Property) {
    if (property && property.propertyStats) {
      return property.propertyStats[(Object.keys(property.propertyStats)[0])]['zoneDensity'];
    }
  }

  getParcelArea(property: Property) {
    if (property && property.propertyStats) {
      return property.propertyStats[(Object.keys(property.propertyStats)[0])]['parcelArea'];
    }
  }

  getBuildingArea( property: Property) {
    if (property && property.propertyStats) {
      return property.propertyStats[(Object.keys(property.propertyStats)[0])]['buildingArea'];
    }
  }

  getBuildingDistances( property: Property) {
    if (property && property.propertyStats) {
      return property.propertyStats[(Object.keys(property.propertyStats)[0])]['buildingDistances'];
    }
  }
}
