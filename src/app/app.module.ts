import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { HttpClientModule } from '@angular/common/http';

import { AppState, appInitialState } from './state-management/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FetchRealEstateReducer } from './state-management/reducers/fetch-real-estate-reducer';
import { FetchRealEstateEffects } from './state-management/effects/fetch-real-estate-effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SearchService } from './services/search.service';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { RealEstateDetailComponent } from './components/real-estate-detail/real-estate-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RealEstateComponent,
    RealEstateDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DeferLoadModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('fetch-real-estate', FetchRealEstateReducer),
    EffectsModule.forRoot([FetchRealEstateEffects]),
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: ':realEstateId', component: RealEstateDetailComponent },
      { path: '**', redirectTo: '/' }
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [ SearchService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
