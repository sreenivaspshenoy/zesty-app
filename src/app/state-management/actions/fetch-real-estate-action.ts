import { Action } from '@ngrx/store';
import { Property } from 'src/app/interfaces/geo-json-interfaces';

export enum FetchRealEstateActionType {
    FETCH_REAL_ESTATE_FOR_POINT = '[FETCH REAL ESTATE] FETCH_REAL_ESTATE_FOR_POINT',
    FETCH_REAL_ESTATE_FOR_POINT_SUCCESS = '[FETCH REAL ESTATE] FETCH_REAL_ESTATE_FOR_POINT_SUCCESS',
    FETCH_REAL_ESTATE_FOR_POINT_ERROR = '[FETCH REAL ESTATE] FETCH_REAL_ESTATE_FOR_POINT_ERROR',

    FETCH_REAL_ESTATE_WITH_ID = '[FETCH REAL ESTATE ID] FETCH_REAL_ESTATE_WITH_ID',
    FETCH_REAL_ESTATE_WITH_ID_SUCCESS = '[FETCH REAL ESTATE ID] FETCH_REAL_ESTATE_WITH_ID_SUCCESS',
    FETCH_REAL_ESTATE_WITH_ID_ERROR = '[FETCH REAL ESTATE ID] FETCH_REAL_ESTATE_WITH_ID_ERROR',

    FETCH_REAL_ESTATE_DETAIL = '[FETCH_REAL_ESTATE_DETAIL] FETCH_REAL_ESTATE_DETAIL',
    FETCH_REAL_ESTATE_DETAIL_SUCCESS = '[FETCH_REAL_ESTATE_DETAIL] FETCH_REAL_ESTATE_DETAIL_SUCCESS',
    FETCH_REAL_ESTATE_DETAIL_ERROR = '[FETCH_REAL_ESTATE_DETAIL] FETCH_REAL_ESTATE_DETAIL_ERROR',

    TOGGLE_DISPLAY = '[TOGGLE_DISPLAY] TOGGLE_DISPLAY',
    TOGGLE_DISPLAY_SUCCESS = '[TOGGLE_DISPLAY] TOGGLE_DISPLAY_SUCCESS',
    TOGGLE_DISPLAY_ERROR = '[TOGGLE_DISPLAY] TOGGLE_DISPLAY_ERROR'
}

export class FetchRealEstateForPoint implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT;
    constructor(
        public latitude: string,
        public longitude: string,
        public xRadius: string
    ) { }
}

export class FetchRealEstateForPointSuccess implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT_SUCCESS;
    constructor(
        public realEstateProperties: Property[]
    ) { }
}

export class FetchRealEstateForPointError implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT_ERROR;
    constructor(
        public error: any
    ) { }
}

export class FetchRealEstateWithId implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID;
    constructor(
        public realEstateProperty: Property
    ) {}
}

export class FetchRealEstateWithIdSuccess implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID_SUCCESS;
    constructor(
        public property: Property,
        public imgData: Blob
    ) {}
}

export class FetchRealEstateWithIdError implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID_ERROR;
    constructor(
        public property: Property
    ) {}
}

export class FetchRealEstateDetail implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_DETAIL;
    constructor(
        public realEstatePropertyId: string,
        public radius: string,
    ) {}
}

export class FetchRealEstateDetailSuccess implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_DETAIL_SUCCESS;
    constructor(
        public realEstatePropertyId: string,
        public statistics: any,
        public radius: string,
    ) {}
}

export class FetchRealEstateDetailError implements Action {
    public readonly type = FetchRealEstateActionType.FETCH_REAL_ESTATE_DETAIL_ERROR;
    constructor(
        public error: any
    ) {}
}

export class ToggleOverlayAction implements Action {
    public readonly type = FetchRealEstateActionType.TOGGLE_DISPLAY;
    constructor(
        public realEstatePropertyId: string
    ) {}
}

export class ToggleOverlaySuccess implements Action {
    public readonly type = FetchRealEstateActionType.TOGGLE_DISPLAY_SUCCESS;
    constructor(
        public realEstatePropertyId: string,
        public overlayedBlobData: Blob
    ) {}
}

export class ToggleOverlayError implements Action {
    public readonly type = FetchRealEstateActionType.TOGGLE_DISPLAY_ERROR;
    constructor(
        public error: any
    ) {}
}

export type FetchRealEstateActions =
    FetchRealEstateForPoint |
    FetchRealEstateForPointSuccess |
    FetchRealEstateForPointError |
    FetchRealEstateWithId |
    FetchRealEstateWithIdSuccess |
    FetchRealEstateWithIdError |
    FetchRealEstateDetail |
    FetchRealEstateDetailSuccess |
    FetchRealEstateDetailError |
    ToggleOverlayAction |
    ToggleOverlayError |
    ToggleOverlaySuccess;

