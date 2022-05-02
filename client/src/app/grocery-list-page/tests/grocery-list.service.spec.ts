import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GroceryListService } from '../grocery-list/grocery-list.service';
import { GroceryListItem } from '../types';
import { firstValueFrom } from 'rxjs';

// Small tests but just to demo test layout
describe('GroceryListService', () => {
  const apiBaseRoute = 'test-route';
  const apiFullRoute = `${apiBaseRoute}/GroceryList`;
  let httpController: HttpTestingController;
  let service: GroceryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GroceryListService,
        { provide: 'BASE_URL', useValue: apiBaseRoute },
      ],
    });

    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GroceryListService);
  });

  describe('Grocery list', () => {
    beforeEach(() => (service = TestBed.inject(GroceryListService)));
    afterEach(() => service.ngOnDestroy());

    it('should share single GET fetch', async () => {
      service.groceryListItems$.subscribe();

      httpController
        .expectOne(apiFullRoute)
        .flush([{ id: 1, description: 'Test item #1' }] as GroceryListItem[]);

      expect(await firstValueFrom(service.groceryListItems$)).toEqual(
        await firstValueFrom(service.groceryListItems$)
      );
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      service = TestBed.inject(GroceryListService);
      httpController.expectOne(apiFullRoute).flush([] as GroceryListItem[]);
    });
    afterEach(() => service.ngOnDestroy());

    it('should add grocery list item', async () => {
      const addActionPromise = service.addAsync('Test item');

      httpController.expectOne(apiFullRoute).flush(null);
      httpController.expectOne(apiFullRoute).flush(
        (() => {
          expect(true).toBeTrue();
          return [];
        })()
      );
      await addActionPromise;
      httpController.verify();
    });

    it('should delete grocery list item', async () => {
      const deleteActionPromise = service.deleteAsync(2);

      httpController.expectOne(`${apiFullRoute}/2`).flush(null);
      httpController.expectOne(apiFullRoute).flush(
        (() => {
          expect(true).toBeTrue();
          return [];
        })()
      );
      await deleteActionPromise;
      httpController.verify();
    });
  });
});
