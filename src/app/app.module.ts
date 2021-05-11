import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsPageComponent } from '@components/details-page/details-page.component';
import { MatButtonModule } from '@angular/material/button';
import { HomePageModule } from '@components/home-page/home-page.module';
import { ApiService } from '@services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from '@state/app.reducer';
import { environment } from 'src/environments/environment';
import { AutoEffects } from '@state/auto.effects';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, DetailsPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([AutoEffects]),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
