import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryListPageComponent } from './grocery-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: GroceryListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceryListPageRoutingModule {}
