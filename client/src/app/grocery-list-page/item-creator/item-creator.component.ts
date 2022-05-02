import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-item-creator',
  template: `
    <mat-form-field>
      <mat-label>Enter grocery list item</mat-label>
      <input
        #groceryItemInput
        matInput
        placeholder="Press Enter to add item..."
        (keydown.enter)="onItemAdd(groceryItemInput.value)"
      />
    </mat-form-field>
  `,
  host: {
    class: 'item-creator',
  },
})
export class ItemCreatorComponent {
  /**
   * Emits a string representing the grocery item description when submitted for addition.
   *
   * @memberof ItemCreatorComponent
   */
  @Output() addItem = new EventEmitter<string>();

  @ViewChild('groceryItemInput', { read: MatInput })
  groceryItemInput?: MatInput;

  /**
   * Emits a grocery list item description.
   *
   * @param {string} description The grocery list item description.
   * @memberof GroceryListComponent
   */
  onItemAdd(description: string): void {
    this.addItem.emit(description);

    if (this.groceryItemInput) {
      this.groceryItemInput.value = '';
    }
  }
}
