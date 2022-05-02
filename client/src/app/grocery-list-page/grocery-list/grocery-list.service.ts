import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  catchError,
  firstValueFrom,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  zip,
} from 'rxjs';
import { GroceryListActionResult, GroceryListItem } from '../types';

/**
 * A class designed to perform HTTP actions for the grocery list.
 *
 * @export
 * @class GroceryListService
 * @implements {OnDestroy}
 */
@Injectable({
  // This is a small enough application so we'll just let it be provided in root.
  // If the application was larger then I'd evaluate if this was the choice still made sense for the application architecture.
  providedIn: 'root',
})
export class GroceryListService implements OnDestroy {
  /**
   * An observable that emits a collection of GroceryListItem objects. You can subscribe
   * to this observable as many times as needed without hindering performance.
   *
   * @type {Observable<GroceryListItem[]>}
   * @memberof GroceryListService
   */
  public readonly groceryListItems$: Observable<GroceryListItem[]>;

  // Internal properties. These look self-explanatory enough in my opinion so I won't comment each one.
  private readonly _groceryListItems = new ReplaySubject<GroceryListItem[]>(1);
  private readonly _baseUrl: string;
  private readonly _destroyed$ = new Subject<void>();
  private readonly _http: HttpClient;
  private readonly _httpRoute: string;

  /**
   * Creates an instance of GroceryListService class.
   * @param {HttpClient} http Provide an HttpClient for making HTTP calls.
   * @param {string} baseUrl Provide a string that's the base API URL. Do not add a forward-slash (/) at the end.
   * @memberof GroceryListService
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
    this._httpRoute = `${this._baseUrl}/GroceryList`;

    this.groceryListItems$ = this._groceryListItems.pipe(
      takeUntil(this._destroyed$)
    );
    this._groceryListItems$.subscribe((groceryListItems: GroceryListItem[]) =>
      this._groceryListItems.next(groceryListItems)
    );
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

  /**
   * Add a grocery list item to the DB.
   *
   * @param {string} description The grocery list item description.
   * @returns {Promise<GroceryListActionResult>} A promise of type GroceryListActionResult. The success property will
   * be true if successful and false if not. If not successful, the message property will indicate why.
   * @memberof GroceryListService
   */
  async addAsync(description: string): Promise<GroceryListActionResult> {
    const addGroceryListItem$ = this._mapHttpActionCallPiping(
      this._http.put(this._httpRoute, `"${description}"`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          accept: '*/*',
        }),
      })
    );

    return await firstValueFrom(addGroceryListItem$);
  }

  /**
   * Delete a grocery list item from the DB.
   *
   * @param {number} id Provide the ID of the grocery list item to delete.
   * @returns {Promise<GroceryListActionResult>} A promise of type GroceryListActionResult. The success property will
   * be true if successful and false if not. If not successful, the message property will indicate why.
   * @memberof GroceryListService
   */
  async deleteAsync(id: number): Promise<GroceryListActionResult> {
    const addGroceryListItem$ = this._mapHttpActionCallPiping(
      this._http.delete(`${this._httpRoute}/${id}`)
    );

    return await firstValueFrom(addGroceryListItem$);
  }

  /**
   * Get an observable that makes a single HTTP GET call to fetch the grocery list items.
   *
   * @readonly
   * @private
   * @type {Observable<GroceryListItem[]>} An observable of type GroceryListItem collection.
   * @memberof GroceryListService
   */
  private get _groceryListItems$(): Observable<GroceryListItem[]> {
    return this._http.get<GroceryListItem[]>(this._httpRoute).pipe(take(1));
  }

  /**
   * Create a GroceryListActionResult object which indicates an unsuccessful result.
   *
   * @param message The message describing why the action was unsuccessful.
   *
   * @returns A GroceryListActionResult object with success=false and a message describing what happened.
   */
  private _createErrorResult(message: string): GroceryListActionResult {
    return {
      message,
      success: false,
    };
  }

  /**
   * Create a GroceryListActionResult object which indicates a successful result.
   *
   * @returns A GroceryListActionResult object with success=true.
   */
  private _createSuccessResult(): GroceryListActionResult {
    return {
      success: true,
    };
  }

  /**
   * Check if the provided parameter is of type GroceryListActionResult.
   *
   * @param result The object to check the type of.
   * @returns
   */
  private _isGroceryListActionResult(
    result: any
  ): result is GroceryListActionResult {
    if (
      result === null ||
      result.success === undefined ||
      result.success === null
    ) {
      return false;
    }

    return (
      typeof result.success === 'boolean' &&
      ((result.message !== undefined && typeof result.message === 'string') ||
        result.message === undefined)
    );
  }

  /**
   * Adds common pipes to the provided HTTP action observable for performing grocery list actions.
   *
   * @private
   * @param {Observable<Object>} request$ An HTTP action observable.
   * @returns {Observable<GroceryListActionResult>} An observable of type GroceryListActionResult with pipes added to it
   * for common actions.
   * @memberof GroceryListService
   */
  private _mapHttpActionCallPiping(
    request$: Observable<Object>
  ): Observable<GroceryListActionResult> {
    return request$.pipe(
      catchError(
        (response: HttpErrorResponse) =>
          of(this._createErrorResult(response.error) as any) // Don't like to use "any" but it's a quick fix for the "map" pipe expecting two different possible types.
      ),
      map((response: HttpResponse<void> | GroceryListActionResult) => {
        if (this._isGroceryListActionResult(response)) {
          return response;
        }

        return this._createSuccessResult();
      }),
      switchMap((result: GroceryListActionResult) =>
        zip(of(result), this._groceryListItems$)
      ),
      tap((data: [GroceryListActionResult, GroceryListItem[]]) =>
        this._groceryListItems.next(data[1])
      ),
      map((data: [GroceryListActionResult, GroceryListItem[]]) => data[0])
    );
  }
}
