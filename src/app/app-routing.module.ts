import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { CounterContainerComponent } from './my-counter/counter-container.component';

const routes: Routes = [
  {path: 'c/:pp/:xx/:yy', component: CounterContainerComponent, data: {id: 'A', name: 'aa'}},
  {path: 'c2', component: CounterContainerComponent, data: {id: 'B', name: 'bb'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
