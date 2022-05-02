import { InjectionToken } from '@angular/core';
import { GroceryList } from './types';

/**
 * An injection token for providing the GroceryList interface.
 */
export const GROCERY_LIST = new InjectionToken<GroceryList>('GROCERY_LIST');
