import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { GroceryListPageHarnessFilters } from './grocery-list-page-harness-filters';

/**
 * A class designed for simplifying communication between tests and the GroceryListPageComponent class.
 *
 * @export
 * @class GroceryListPageHarness
 * @extends {ComponentHarness}
 */
export class GroceryListPageHarness extends ComponentHarness {
  static hostSelector = '.grocery-list-page';

  private _getAddItemInput = this.locatorFor(
    '.item-creator .mat-input-element'
  );
  private _getGroceryListItems = this.locatorForAll(
    '[data-test="grocery-list-item"]'
  );

  /**
   * Get a HarnessPredicate instance for the GroceryListPageHarness class.
   *
   * @static
   * @param {GroceryListPageHarnessFilters} [options={}] Optional GroceryListPageHarnessFilters
   * for locating the correct testing component instance.
   * @returns {HarnessPredicate<GroceryListPageHarness>}
   * @memberof GroceryListPageHarness
   */
  static with(
    options: GroceryListPageHarnessFilters = {}
  ): HarnessPredicate<GroceryListPageHarness> {
    return new HarnessPredicate(GroceryListPageHarness, options);
  }

  /**
   * Add an item to the grocery list.
   *
   * @param {string} description The item description.
   * @returns {Promise<void>} A void promise.
   * @memberof GroceryListPageHarness
   */
  async addItem(description: string): Promise<void> {
    const input = await this._getAddItemInput();

    await input.setInputValue(description);
    await input.dispatchEvent('keydown', {
      key: 'Enter',
    });
  }

  /**
   * Get a collection of
   *
   * @returns {Promise<string[]>}
   * @memberof GroceryListPageHarness
   */
  async getItemDescriptions(): Promise<string[]> {
    const itemElements = await this._getGroceryListItems();

    const items = [];
    for (const element of itemElements) {
      items.push(await element.text());
    }

    return items.map((item) => item.replace('delete', '').trim());
  }
}
