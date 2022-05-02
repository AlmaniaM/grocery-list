import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GROCERY_LIST } from './tokens';
import { GroceryListService } from './grocery-list/grocery-list.service';
import { GroceryListPageRoutingModule } from './grocery-list-page.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ItemCreatorComponent } from './item-creator/item-creator.component';
import { GroceryListPageComponent } from './grocery-list-page.component';

@NgModule({
  declarations: [
    GroceryListPageComponent,
    GroceryListComponent,
    ItemCreatorComponent,
  ],
  exports: [
    GroceryListPageComponent,
    GroceryListComponent,
    ItemCreatorComponent,
  ],
  imports: [
    CommonModule,
    GroceryListPageRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
  ],
  providers: [{ provide: GROCERY_LIST, useClass: GroceryListService }],
})
export class GroceryListPageModule {}
