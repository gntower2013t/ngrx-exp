import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppState, getItem, StudyDetail, getItemFull, ReqProcFull } from 'src/app/+state/history.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {

  @Input() id: string
  @Input() set item(item: StudyDetail) {
    this.id = item.studyUID
  }

  item$: Observable<ReqProcFull>;

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    console.log(`item comp init: ${this.id}`);

    this.item$ = this.store.select(getItemFull(this.id))
  }

  check() {
    console.warn(`item check ${this.id}`);
  }

}
