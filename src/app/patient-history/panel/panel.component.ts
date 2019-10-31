import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqProcFull, AppState, getIds } from 'src/app/+state/history.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements OnInit {

  itemIds$: Observable<string[]>

  items: ReqProcFull[]

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.itemIds$ = this.store.select(getIds) as Observable<string[]>;
  }

  check() {
    console.warn(`check PanelComponent`);
  }
}
