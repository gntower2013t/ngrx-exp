import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-counter-dup',
  template: `
  <app-my-counter [mark]="'up'"></app-my-counter>
  `,
  // <app-my-counter [mark]="'down'"></app-my-counter>

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
/*     this.route.paramMap.pipe(
      map(p => p.get('pp')),
      tap(x => console.log(`parent tap pp ${x}`))
    )
      .subscribe(_ => { }) */
  }

}
