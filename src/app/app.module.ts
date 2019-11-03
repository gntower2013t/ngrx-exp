import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './+state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { PatientHistoryModule } from './patient-history/patient-history.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule } from '@angular/forms';
import { BtnWrapperComponent } from './btn-wrapper/btn-wrapper.component';
import { CounterContainerComponent } from './my-counter/counter-container.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    CounterContainerComponent,
    ButtonsComponent,
    BtnWrapperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PatientHistoryModule,
    AppRoutingModule,

    StoreModule.forRoot({ count: counterReducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
