import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCounterComponent } from './my-counter/my-counter.component';

const routes: Routes = [
  {path: 'c1', component: MyCounterComponent, data: {id: 'A', name: 'aa'}},
  {path: 'c2', component: MyCounterComponent, data: {id: 'B', name: 'bb'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
