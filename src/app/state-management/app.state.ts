import { Property, PropertyStats } from '../interfaces/geo-json-interfaces';

export interface AppState {
    latitude: string;
    longitude: string;
    xRadius: string;
    properties: Property[];
    overlayedImageShown: boolean;

}

export const appInitialState: AppState = {
    latitude: null,
    longitude: null,
    xRadius: null,
    properties: [],
    overlayedImageShown: false
};

