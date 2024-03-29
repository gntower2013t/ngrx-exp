import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ngrx-exp';

  ngDoCheck() {
    // console.log(`check AppComponent`);
  }

  check() {
    console.warn('root view checked');
  }
}
