import { BaseHarnessFilters } from '@angular/cdk/testing';

/**
 * An interface designed to represent an object that provides different options
 * for searching the GroceryListPageComponent testing components.
 *
 * @export
 * @interface GroceryListPageHarnessFilters
 * @extends {BaseHarnessFilters}
 */
export interface GroceryListPageHarnessFilters extends BaseHarnessFilters {
  id?: string;
}
