using Microsoft.EntityFrameworkCore;

namespace GroceryList.GroceryList
{
	/// <summary>
	/// A class designed to act as a data repository for the grocery list.
	/// </summary>
	public class GroceryListRepository : DbContext, IGroceryList
	{
		/// <summary>
		/// Create an instance of the <see cref="GroceryListRepository"/> class.
		/// </summary>
		/// <param name="context">Provide a <see cref="DbContextOptions{TContext}"/> of type <see cref="GroceryListRepository"/>
		/// for configuring this DbContext.</param>
		public GroceryListRepository(DbContextOptions<GroceryListRepository> context = default)
			: base(context) { }

		/// <inheritdoc/>
		public DbSet<GroceryListItem> GroceryList { get; set; }

		/// <inheritdoc/>
		public async Task AddAsync(string description, CancellationToken cancellationToken)
		{
			await GroceryList.AddAsync(new GroceryListItem(description), cancellationToken);
			cancellationToken.ThrowIfCancellationRequested();
			await SaveChangesAsync();
		}

		/// <inheritdoc/>
		public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var groceryListItemToRemove = GroceryList.Find(id);
			cancellationToken.ThrowIfCancellationRequested();

			if (groceryListItemToRemove is not null)
			{
				cancellationToken.ThrowIfCancellationRequested();
				GroceryList.Remove(groceryListItemToRemove);
				cancellationToken.ThrowIfCancellationRequested();
				await SaveChangesAsync();
			}
		}

		/// <inheritdoc/>
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<GroceryListItem>(entity => entity.HasKey(e => e.Id));
		}
	}
}
