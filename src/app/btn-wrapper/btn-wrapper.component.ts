import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-btn-wrapper',
  templateUrl: './btn-wrapper.component.html',
  styleUrls: ['./btn-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  check() {
    console.warn(`btn wrapper checked`);
  }

}
