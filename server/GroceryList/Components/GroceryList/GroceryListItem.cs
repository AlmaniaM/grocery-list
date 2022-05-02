namespace GroceryList.GroceryList
{
	/// <summary>
	/// A class designed to represent a single grocery list row item.
	/// </summary>
	public record GroceryListItem
	{
		/// <summary>
		/// Create an instance of the <see cref="GroceryListItem"/> record.
		/// </summary>
		/// <param name="description">Provide a description for the grocery list item.</param>
		public GroceryListItem(string description)
		{
			Description = description;
		}

		/// <summary>
		/// The grocery list item unique ID. This will always increment from oldest to newest.
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// The contents of this grocery list item.
		/// </summary>
		public string Description { get; set; }
	}
}
