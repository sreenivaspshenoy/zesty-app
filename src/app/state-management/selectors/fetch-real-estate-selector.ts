import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Property } from 'src/app/interfaces/geo-json-interfaces';

export const fetchRealEstateFeatureSelector = createFeatureSelector('fetch-real-estate');

export const fetchRealEstateRootSelector = createSelector(
    fetchRealEstateFeatureSelector,
    (state: AppState) => state,
);

export const fetchPropertiesSelector = createSelector(
    fetchRealEstateFeatureSelector,
    (state: AppState): Property[] => state.properties
);

export const fetchOverlayedImageSelector = propertyId => createSelector(
    fetchRealEstateFeatureSelector,
    (state: AppState): string => state.properties.filter(property => property.propertyId == propertyId)[0].overlayedImg
);
