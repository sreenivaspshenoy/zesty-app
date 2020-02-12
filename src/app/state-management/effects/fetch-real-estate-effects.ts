import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of, forkJoin } from 'rxjs';
import { tap, mergeMap, map, switchMap, catchError, withLatestFrom, flatMap } from 'rxjs/operators';
import { Store, Action, select } from '@ngrx/store';
import { AppState } from '../../state-management/app.state';
import { fetchPropertiesSelector } from '../selectors/fetch-real-estate-selector';

import {
    FetchRealEstateActionType,
    FetchRealEstateForPoint,
    FetchRealEstateForPointError,
    FetchRealEstateForPointSuccess,
    FetchRealEstateWithId,
    FetchRealEstateWithIdSuccess,
    FetchRealEstateWithIdError,
    FetchRealEstateDetail,
    FetchRealEstateDetailSuccess,
    FetchRealEstateDetailError,
    ToggleOverlayAction,
    ToggleOverlaySuccess,
    ToggleOverlayError
} from '../actions/fetch-real-estate-action';

import { SearchService } from '../../services/search.service';
import { ToggleAction } from '@ngrx/store-devtools/src/actions';

@Injectable()
export class FetchRealEstateEffects {
    constructor(
        private actions$: Actions,
        private searchService: SearchService,
        private router: Router,
        private store$: Store<AppState>,
    ) {}

    @Effect()
    public fetchRealEstatesForPoint$ = this.actions$
    .pipe(
        ofType(FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT),
        map((action: FetchRealEstateForPoint) => action),
        switchMap((action) => {
            return this.searchService.findProperties(action.latitude, action.longitude, action.xRadius)
            .pipe(
                map((realEstateProperties) => {
                    return new FetchRealEstateForPointSuccess(realEstateProperties);
                }),
                catchError(error => of(new FetchRealEstateForPointError(error)))
            );
        }),
    );

    @Effect()
    public fetchRealEstatesForPointSuccess$ = this.actions$
    .pipe(
        ofType(FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT_SUCCESS),
        map((action: FetchRealEstateForPointSuccess) => action.realEstateProperties),
        switchMap((realEstateProperties) => {
            return realEstateProperties.map((property) => new FetchRealEstateWithId(property));
        }),
    );

    @Effect({dispatch: false})
    public fetchRealEstatesForPointError$ = this.actions$
    .pipe(
        ofType(FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT_ERROR),
        map((action: FetchRealEstateForPointError) => action),
    );

    @Effect()
    public fetchRealEstateWithId$ = this.actions$
    .pipe(
        ofType(FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID),
        map((action: FetchRealEstateWithId) => action),
        flatMap((action) => {
            return this.searchService.getProperty(action.realEstateProperty.propertyId)
            .pipe(
                map((blobData: Blob) => new FetchRealEstateWithIdSuccess(action.realEstateProperty, blobData)),
                catchError((error: any) => of(new FetchRealEstateWithIdError(action.realEstateProperty)))
            );
        })
    );

    @Effect({dispatch : false})
    public fetchRealEstateWithIdSuccess$ = this.actions$
    .pipe(
        ofType(FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID_SUCCESS),
        map((action: FetchRealEstateWithIdSuccess) => action.imgData),
    );

    @Effect()
    public fetchRealEstateDetail$ = this.actions$
    .pipe(
        ofType(FetchRealEstateActionType.FETCH_REAL_ESTATE_DETAIL),
        map((action: FetchRealEstateDetail) => action),
        switchMap((action) => {
            return this.searchService.getPropertyDetail(action.realEstatePropertyId, 1000000)
            .pipe(
                map((realEstateStatistics) => {
                    return new FetchRealEstateDetailSuccess(action.realEstatePropertyId, realEstateStatistics, action.radius);
                }),
                catchError(error => of(new FetchRealEstateDetailError(error)))
            );
        }),
    );

    @Effect()
    public toggleOverlay$ = this.actions$
    .pipe(
        ofType(FetchRealEstateActionType.TOGGLE_DISPLAY),
        map((action: ToggleOverlayAction) => action),
        switchMap((action) => {
            return this.searchService.getOverlayedImage(action.realEstatePropertyId)
            .pipe(
                map((overlayedBlobData: Blob) => new ToggleOverlaySuccess(action.realEstatePropertyId, overlayedBlobData)),
                catchError((error: any) => of(new ToggleOverlayError(error)))
            );
        })
    );
}
