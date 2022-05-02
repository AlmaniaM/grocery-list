import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GROCERY_LIST } from './tokens';
import { GroceryList, GroceryListActionResult, GroceryListItem } from './types';

/**
 * A component class designed for displaying the grocery list page with all necessary components
 * such as grocery item creation and the grocery list.
 *
 * @export
 * @class GroceryListPageComponent
 */
@Component({
  selector: 'app-grocery-list-page',
  template: `
    <div class="item-create-container">
      <app-item-creator (addItem)="addItemAsync($event)"></app-item-creator>
      <mat-hint
        class="mat-error error-message"
        *ngIf="errorMessage.length > 0"
        >{{ errorMessage }}</mat-hint
      >
    </div>
    <app-grocery-list
      [items]="items$ | async"
      (removeItem)="deleteItemAsync($event)"
    ></app-grocery-list>
  `,
  styles: [
    `
      :host {
        & .item-create-container {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          & .error-message {
            margin-left: 1rem;
            margin-bottom: 0.7rem;
          }
        }
      }
    `,
  ],
  host: {
    class: 'grocery-list-page',
  },
})
export class GroceryListPageComponent {
  private _errorMessage = '';
  private _groceryList: GroceryList;

  /**
   * Creates an instance of GroceryListPageComponent class.
   * @param {GroceryList} groceryList Provide a GroceryList object for grocery list manipulation.
   * @memberof GroceryListPageComponent
   */
  constructor(@Inject(GROCERY_LIST) groceryList: GroceryList) {
    this._groceryList = groceryList;
  }

  /**
   * Get the current error message if any.
   *
   * @readonly
   * @type {string}
   * @memberof GroceryListPageComponent
   */
  get errorMessage(): string {
    return this._errorMessage;
  }

  /**
   * An observable the emits the grocery list items whenever new ones are updated.
   *
   * @readonly
   * @type {Observable<GroceryListItem[]>}
   * @memberof GroceryListPageComponent
   */
  get items$(): Observable<GroceryListItem[]> {
    return this._groceryList.groceryListItems$;
  }

  /**
   * Add a grocery list item to the service.
   *
   * @param {string} description Provide the grocery list item description to add.
   * @returns {Promise<void>} A void promise.
   * @memberof GroceryListPageComponent
   */
  async addItemAsync(description: string): Promise<void> {
    this._setErrorMessage(await this._groceryList.addAsync(description));
  }

  /**
   * Delete a grocery list item from the service.
   *
   * @param {number} id The grocery list item ID to delete.
   * @returns {Promise<void>} A void promise.
   * @memberof GroceryListPageComponent
   */
  async deleteItemAsync(id: number): Promise<void> {
    this._setErrorMessage(await this._groceryList.deleteAsync(id));
  }

  /**
   * Set or clear the error message based on the provided result.
   *
   * @param result A GroceryListActionResult object.
   */
  private _setErrorMessage(result: GroceryListActionResult): void {
    if (!result.success) {
      this._errorMessage = result.message ?? '';
    } else if (this._errorMessage) {
      this._errorMessage = '';
    }
  }
}
