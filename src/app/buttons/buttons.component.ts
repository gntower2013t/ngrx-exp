import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { studyLoaded, addStudy, setImg, reload } from '../+state/history.reducer';
import { add } from '../+state/reducers';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent implements OnInit {

  id: string;
  nn: number;

  constructor(private store:Store<any>) { }

  ngOnInit() {
  }

  ngDoCheck() {
    // console.log(`check ButtonsComponent`);
  }

  check() {
    console.warn('button view checked');
  }

  tm() {
    setTimeout(() => {
      console.log("in timeout set img");
      this.id = "xx"
      this.store.dispatch(setImg([this.id, 100]))
    }, 1000);
  }
  tm2() {
    setTimeout(() => {
      console.log("in timeout add");
      this.store.dispatch(add({add:100}))
    }, 1000);
  }

  loadStudies() {
    this.store.dispatch(studyLoaded({
      list: [
      {studyUID:'aa', nImgs:5},
      {studyUID:'bb', nImgs:4},
      {studyUID:'cc', nImgs:3},
    ]}))
  }

  reload() {
    this.store.dispatch(reload({
      list: [
      { studyUID: 'xx', nImgs: 99 },
      {studyUID:'aa', nImgs:1},
      {studyUID:'bb', nImgs:2},
      {studyUID:'cc', nImgs:3},
    ]}))
  }

  add() {
    this.store.dispatch(addStudy({studyUID:this.id, nImgs:1}))
  }
  set() {
    this.store.dispatch(setImg([this.id, this.nn]))
  }

}
