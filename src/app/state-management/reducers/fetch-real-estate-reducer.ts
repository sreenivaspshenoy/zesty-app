import {
    FetchRealEstateActions,
    FetchRealEstateActionType,
    FetchRealEstateForPoint,
    FetchRealEstateForPointSuccess,
    FetchRealEstateForPointError,
    FetchRealEstateWithId,
    FetchRealEstateWithIdSuccess,
    FetchRealEstateWithIdError,
    FetchRealEstateDetailSuccess,
    FetchRealEstateDetail,
    FetchRealEstateDetailError,
    ToggleOverlayAction,
    ToggleOverlaySuccess,
    ToggleOverlayError
} from '../actions/fetch-real-estate-action';

import {
    appInitialState, AppState
} from '../app.state';

export function FetchRealEstateReducer(
    state = appInitialState,
    action: FetchRealEstateActions
): AppState {
    switch (action.type) {
        case FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT: return fetchRealEstateForPointHandler(action, state);
        case FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT_SUCCESS: return fetchRealEstateForPointSuccessHandler(action, state);
        case FetchRealEstateActionType.FETCH_REAL_ESTATE_FOR_POINT_ERROR: return fetchRealEstateForPointErrorHandler(action, state);

        case FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID: return fetchRealEstateWithId(action, state);
        case FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID_SUCCESS: return fetchRealEstateWithIdSuccess(action, state);
        case FetchRealEstateActionType.FETCH_REAL_ESTATE_WITH_ID_ERROR: return fetchRealEstateWithIdError(action, state);

        case FetchRealEstateActionType.FETCH_REAL_ESTATE_DETAIL: return fetchRealEstateDetail(action, state);
        case FetchRealEstateActionType.FETCH_REAL_ESTATE_DETAIL_SUCCESS: return fetchRealEstateDetailSuccess(action, state);
        case FetchRealEstateActionType.FETCH_REAL_ESTATE_DETAIL_ERROR: return fetchRealEstateDetailError(action, state);

        case FetchRealEstateActionType.TOGGLE_DISPLAY: return toggleOverlayDisplay(action, state);
        case FetchRealEstateActionType.TOGGLE_DISPLAY_SUCCESS: return toggleOverlaySuccess(action, state);
        case FetchRealEstateActionType.TOGGLE_DISPLAY_ERROR: return toggleOverlayDisplayError(action, state);
    }
    return state;
}

function fetchRealEstateForPointHandler(
    action: FetchRealEstateForPoint,
    state: AppState,
): AppState {
    return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
        xRadius: action.xRadius,
        properties: [],
    };
}

function fetchRealEstateForPointSuccessHandler(
    action: FetchRealEstateForPointSuccess,
    state: AppState,
): AppState {
    return {
        ...state,
        properties: action.realEstateProperties
    };
}

function fetchRealEstateForPointErrorHandler(
    action: FetchRealEstateForPointError,
    state: AppState,
): AppState {
    return {
        ...state,
    };
}

function fetchRealEstateWithId(
    action: FetchRealEstateWithId,
    state: AppState,
): AppState {

    return {
        ...state,
    };
}

function fetchRealEstateWithIdSuccess(
    action: FetchRealEstateWithIdSuccess,
    state: AppState,
): AppState {
    const properties = [...state.properties];
    properties.forEach(property => {
        if (property.propertyId === action.property.propertyId) {
            property.img = URL.createObjectURL(action.imgData);
        }
    });
    return {
        ...state,
        properties: properties
    };
}

function fetchRealEstateWithIdError(
    action: FetchRealEstateWithIdError,
    state: AppState,
): AppState {
    const properties = [...state.properties];
    properties.forEach(property => {
        if (property.propertyId === action.property.propertyId) {
            property.img = 'Error';
        }
    });
    return {
        ...state,
        properties: properties
    };
}

function fetchRealEstateDetail(
    action: FetchRealEstateDetail,
    state: AppState
    ): AppState {
        return {
            ...state
        };
}


function fetchRealEstateDetailSuccess(
    action: FetchRealEstateDetailSuccess,
    state: AppState
    ): AppState {
        const properties = [...state.properties];
        properties.forEach(property => {
            if (property.propertyId === action.realEstatePropertyId) {
                property.propertyStats = {
                    ...property.propertyStats,
                    [action.radius]: action.statistics
                };
            }
        });
        return {
            ...state,
            properties: properties
        };
}

function fetchRealEstateDetailError(
    action: FetchRealEstateDetailError,
    state: AppState
    ): AppState {
        return {
            ...state
        };
}

function toggleOverlayDisplay(
    action: ToggleOverlayAction,
    state: AppState
    ): AppState {
        return {
            ...state
        };
}

function toggleOverlaySuccess(
    action: ToggleOverlaySuccess,
    state: AppState
    ): AppState {
        const properties = [...state.properties];
        properties.forEach(property => {
            if (property.propertyId === action.realEstatePropertyId) {
                property.overlayedImg = URL.createObjectURL(action.overlayedBlobData);
            }
        });
        return {
            ...state,
            properties: properties
        };
}

function toggleOverlayDisplayError(
    action: ToggleOverlayError,
    state: AppState
    ): AppState {
        return {
            ...state
        };
}
