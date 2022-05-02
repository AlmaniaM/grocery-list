import { HarnessLoader } from '@angular/cdk/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { GroceryListPageModule } from '../grocery-list-page.module';
import { GroceryListPageHarness } from './grocery-list-page-harness';
import { GroceryList, GroceryListItem } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { GROCERY_LIST } from '../tokens';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * An interface meant to help mock the existing GroceryList objects.
 */
interface GroceryListTesting extends GroceryList {
  groceryListItems: GroceryListItem[];
  setGroceryListItems(items$: Observable<GroceryListItem[]>): void;
}

/**
 * Create a GroceryListItem object.
 *
 * @param description The grocery list item description.
 * @param id The grocery list item id.
 * @returns A GroceryListItem object.
 */
function createGroceryListItem(
  description: string,
  id: number
): GroceryListItem {
  return {
    description,
    id,
  };
}

/**
 * NOTE: A bit of an overkill here but I wanted to illustrate how you might mock a more complex service if needed.
 */
function createGroceryListItemMock(): GroceryListTesting {
  const groceryListItems = [createGroceryListItem('Item #1', 1)];
  const groceryListItemsSubject = new BehaviorSubject<GroceryListItem[]>(
    groceryListItems
  );

  const groceryList = {
    groceryListItems,
    addAsync: (description: string) => {
      groceryList.groceryListItems.push({
        description,
        id: groceryList.groceryListItems.length + 1,
      });
      groceryListItemsSubject.next(groceryList.groceryListItems);
    },
    deleteAsync: (id: number) => {
      const index = groceryList.groceryListItems.findIndex(
        (item) => item.id === id
      );
      if (index >= 0) {
        groceryList.groceryListItems.splice(index, 1);
        groceryListItemsSubject.next(groceryList.groceryListItems);
      }
    },
    groceryListItems$: groceryListItemsSubject.asObservable(),
    setGroceryListItems: (items$: Observable<GroceryListItem[]>) => {
      (groceryList.groceryListItems$ as any) = items$;
    },
  } as GroceryListTesting;

  return groceryList;
}

// Small test written to demo component integration testing using a component harness.
describe('GroceryListPageComponent', () => {
  let fixture: ComponentFixture<GroceryListPageTestingComponent>;
  let harness: GroceryListPageHarness;
  let loader: HarnessLoader;

  function getHarness(selector: string): Promise<GroceryListPageHarness> {
    return loader.getHarness(GroceryListPageHarness.with({ selector }));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryListPageTestingComponent],
      imports: [GroceryListPageModule, NoopAnimationsModule],
      providers: [
        { provide: GROCERY_LIST, useValue: createGroceryListItemMock() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroceryListPageTestingComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should add grocery list item', async () => {
    harness = await getHarness('#default-grocery-list');

    await harness.addItem('Item #2');
    fixture.detectChanges();

    const groceryItems = await harness.getItemDescriptions();

    expect(groceryItems).toEqual(['Item #1', 'Item #2']);
  });
});

@Component({
  template: ` <app-grocery-list-page
    id="default-grocery-list"
  ></app-grocery-list-page>`,
})
export class GroceryListPageTestingComponent {}
