using Microsoft.EntityFrameworkCore;

namespace GroceryList.GroceryList
{
	/// <summary>
	/// An interface that provides an abstraction to the grocer list
	/// item for minimally required functionality.
	/// </summary>
	public interface IGroceryList : IDisposable
	{
		/// <summary>
		/// A collection of grocery list items.
		/// </summary>
		DbSet<GroceryListItem> GroceryList { get; set; }

		/// <summary>
		/// Add a new grocery list item.
		/// </summary>
		/// <param name="description">The grocery list item description.</param>
		/// <param name="cancellationToken">Provide a <see cref="CancellationToken"/> for canceling ongoing operations.</param>
		/// <returns>A void <see cref="Task"/>.</returns>
		public Task AddAsync(string description, CancellationToken cancellationToken = default);

		/// <summary>
		/// Delete a grocery list item.
		/// </summary>
		/// <param name="id">Provide the <see cref="int"/> id of the grocery list item you wish to delete.</param>
		/// <param name="cancellationToken">Provide a <see cref="CancellationToken"/> for canceling ongoing operations.</param>
		/// <returns>A void <see cref="Task"/>.</returns>
		public Task DeleteAsync(int id, CancellationToken cancellationToken = default);
	}
}