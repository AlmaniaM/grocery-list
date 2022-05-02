import { Observable } from 'rxjs';

// NOTE: I would usually put different types into a single types.ts file if it isn't too complex.

/**
 * A type representing a grocery list item.
 */
export type GroceryListItem = {
  /**
   * The unique ID if the grocery list item. This may also be used as a sort property
   * but does not guarantee increments of one.
   */
  id: number;

  /**
   * The grocery list item description.
   */
  description: string;
};

/**
 * A type representing the result of a grocery list action. Example action is adding a grocery list item.
 * The result will let you know whether the action was successful or not.
 */
export type GroceryListActionResult = {
  /**
   * An optional message. Usually this is populated if the action was not successful.
   * This will let you know why.
   */
  message?: string;

  /**
   * Whether or not the action was successful or not.
   */
  success: boolean;
};

/**
 * An interface designed to act as an abstraction between components and the actual implementation for testing.
 *
 * @export
 * @interface GroceryList
 */
export interface GroceryList {
  /**
   * An observable that emits a collection of GroceryListItem objects. You should be able to subscribe
   * to this observable as many times as needed without hindering performance.
   *
   * @type {Observable<GroceryListItem[]>}
   * @memberof IGroceryListService
   */
  readonly groceryListItems$: Observable<GroceryListItem[]>;

  /**
   * Add a grocery list item to the DB.
   *
   * @param {string} description The grocery list item description.
   * @returns {Promise<GroceryListActionResult>} A promise of type GroceryListActionResult. The success property will
   * be true if successful and false if not. If not successful, the message property will indicate why.
   * @memberof IGroceryListService
   */
  addAsync(description: string): Promise<GroceryListActionResult>;

  /**
   * Delete a grocery list item from the DB.
   *
   * @param {number} id Provide the ID of the grocery list item to delete.
   * @returns {Promise<GroceryListActionResult>} A promise of type GroceryListActionResult. The success property will
   * be true if successful and false if not. If not successful, the message property will indicate why.
   * @memberof IGroceryListService
   */
  deleteAsync(id: number): Promise<GroceryListActionResult>;
}
