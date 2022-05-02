using GroceryList.GroceryList;
using Microsoft.AspNetCore.Mvc;

namespace GroceryList.Controllers
{
	/// <summary>
	/// A class designed to act as a web API controller for the grocery list component.
	/// </summary>
	[Route("[controller]")]
	[ApiController]
	public class GroceryListController : ControllerBase, IDisposable
	{
		private readonly IGroceryList groceryList;

		/// <summary>
		/// Create an instance of the <see cref="GroceryListController"/> class.
		/// </summary>
		/// <param name="groceryList">Provide an <see cref="IGroceryList"/> object for interacting with the grocery list state.</param>
		public GroceryListController(IGroceryList groceryList)
		{
			this.groceryList = groceryList;
		}

		/// <summary>
		/// Get a collection of <see cref="GroceryListItem"/> objects.
		/// </summary>
		/// <returns>An <see cref="IActionResult"/> who's content is an <see cref="IEnumerable{T}"/> of type <see cref="GroceryListItem"/> objects.</returns>
		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GroceryListItem>))]
		[ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(IEnumerable<GroceryListItem>))]
		public IActionResult GetAllGroceryListItems()
		{
			try
			{
				return Ok(groceryList.GroceryList.ToList());
			}
			catch (Exception)
			{
				return NotFound(new List<GroceryListItem> { new("Nothing found...") });
			}
		}

		/// <summary>
		/// Add a grocery list item.
		/// </summary>
		/// <param name="value">The <see cref="string"/> grocery list item description.</param>
		/// <param name="cancellationToken">Provide a <see cref="CancellationToken"/> for canceling ongoing operations.</param>
		/// <returns>An <see cref="IActionResult"/> that contains a <see cref="StatusCodes.Status200OK"/> if successful. If not, the result will be
		/// <see cref="StatusCodes.Status400BadRequest"/> with a <see cref="string"/> message.</returns>
		[HttpPut]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
		public async Task<IActionResult> AddItemAsync([FromBody] string value, CancellationToken cancellationToken)
		{
			try
			{
				await groceryList.AddAsync(value, cancellationToken);
				return Ok();
			}
			catch (Exception)
			{
				return BadRequest($"Could not add the provided grocery list item: {value}.");
			}
		}

		/// <summary>
		/// Delete a grocery list item.
		/// </summary>
		/// <param name="id">The ID of the grocery list item to delete.</param>
		/// <param name="cancellationToken">Provide a <see cref="CancellationToken"/> for canceling ongoing operations.</param>
		/// <returns>An <see cref="IActionResult"/> that contains a <see cref="StatusCodes.Status200OK"/> if successful. If not, the result will be
		/// <see cref="StatusCodes.Status400BadRequest"/> with a <see cref="string"/> message.</returns>
		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
		public async Task<IActionResult> DeleteItemAsync(int id, CancellationToken cancellationToken)
		{
			try
			{
				await groceryList.DeleteAsync(id, cancellationToken);
				return Ok();
			}
			catch (Exception)
			{
				return BadRequest($"Could not delete grocery list item with ID: {id}.");
			}
		}

		/// <summary>
		/// Dispose of any disposable objects.
		/// </summary>
		public void Dispose() => groceryList?.Dispose();
	}
}
