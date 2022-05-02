namespace GroceryList.Config
{
	/// <summary>
	/// A class designed to hold all application configurations provided by the hosting environment.
	/// </summary>
    public class AppConfig
    {
		/// <summary>
		/// The application data base configurations.
		/// </summary>
		public DbConnectionConfig Database { get; set; }
    }

	/// <summary>
	/// A class designed for holding database configurations.
	/// </summary>
    public class DbConnectionConfig
    {
		/// <summary>
		/// The database connection string.
		/// </summary>
        public string ConnectionString { get; init; }
    }
}