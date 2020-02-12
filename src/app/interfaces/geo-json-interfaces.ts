export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface GeoJSON {
    type: string;
    geometry: Geometry;
    xDistance: string;
}

export interface Property {
    coordinates: number[];
    propertyId: string;
    img: any;
    overlayedImg: any;
    propertyStats: {
        [radius: string]: PropertyStats
    };
}

export interface PropertyStats {
    buildingArea: number[];
    parcelArea: number;
    zoneDensity: number[];
    buildingDistances: number[];
}
