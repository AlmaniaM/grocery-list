namespace DlHistoryApi
{
	/// <summary>
	/// A class solely responsible for launching the current web application.
	/// </summary>
    public class Program
    {
		/// <summary>
		/// Simply runs the application.
		/// </summary>
		/// <param name="args">A collection of command line arguments for the application.</param>
		public static async Task Main(string[] args) => await CreateHostBuilder(args).Build().RunAsync();

		/// <summary>
		/// Constructs the application configuration values and services into an <see cref="IHostBuilder"/>.
		/// </summary>
		/// <param name="args">A collection of command line arguments for the application.</param>
		/// <returns>A configured <see cref="IHostBuilder"/> object ready to build and run.</returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
    }
}
