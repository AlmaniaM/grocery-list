import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroceryListItem } from '../types';

/**
 * A class component designed for displaying a grocery list.
 *
 * @export
 * @class GroceryListComponent
 */
@Component({
  selector: 'app-grocery-list',
  template: `
    <mat-list role="list">
      <mat-list-item
        data-test="grocery-list-item"
        role="listitem"
        *ngFor="let listItem of items"
      >
        {{ listItem.description }}
        <button
          mat-icon-button
          color="warn"
          (click)="onDeleteItem(listItem.id)"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `,
  host: {
    class: 'grocery-list',
  },
})
export class GroceryListComponent {
  /**
   * Provide a collection of GroceryListItem objects.
   *
   * @type {GroceryListItem[]}
   * @memberof GroceryListComponent
   */
  @Input() items: GroceryListItem[] | null = null;

  /**
   * Emits a grocery item ID when it's requested for deletion.
   *
   * @memberof GroceryListComponent
   */
  @Output() removeItem = new EventEmitter<number>();

  /**
   * Emit the item ID clicked for deletion.
   *
   * @param {number} id The grocery item ID.
   * @memberof GroceryListComponent
   */
  onDeleteItem(id: number): void {
    this.removeItem.emit(id);
  }
}
