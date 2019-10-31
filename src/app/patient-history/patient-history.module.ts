import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { ItemComponent } from './item/item.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../+state/history.reducer';

@NgModule({
  declarations: [PanelComponent, ItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('patient_history', reducers)
  ],
  exports: [PanelComponent]
})
export class PatientHistoryModule { }
