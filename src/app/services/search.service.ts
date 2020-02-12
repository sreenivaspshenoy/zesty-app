import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap, mergeMap, flatMap } from 'rxjs/operators';

import { Property, PropertyStats } from '../interfaces/geo-json-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private BASE_URL = 'http://localhost:1235';

  constructor(private http: HttpClient) { }

  findProperties(latitude: string, longitude: string, xRadius: string): Observable<Property[]> {
    const url = `${this.BASE_URL}/find`;
    const requestPayload = {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [parseFloat(latitude), parseFloat(longitude)]
      },
      'x-distance': xRadius ? parseFloat(xRadius) : 10000
    };
    const properties$: Observable<Property[]> = this.http.post(url, requestPayload).pipe(
      map(res => res as Property[])
    );
    return properties$;
  }

  getProperty(propertyId): Observable<Blob> {
    const url = `${this.BASE_URL}/display/${propertyId}`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  getPropertyDetail(propertyId, distance): Observable<PropertyStats> {
    distance = distance ? distance : '0';
    const url = `${this.BASE_URL}/statistics/${propertyId}?distance=${distance}`;
    return this.http.get(url).pipe(
      map( res => this.formStatistics(res))
    );
  }

  getOverlayedImage(propertyId): Observable<Blob> {
    const url = `${this.BASE_URL}/display/${propertyId}?overlay=yes&building=green&parcel=orange`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  formStatistics(statistics): PropertyStats {
    return {
      buildingArea: statistics['building_area_sqm'],
      parcelArea : statistics['parcel_area_sqm'],
      zoneDensity: statistics['zone_density'],
      buildingDistances: statistics['building_distances_m']
    };
  }
}
