using GroceryList.Config;
using GroceryList.GroceryList;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace DlHistoryApi
{
    /// <summary>
    /// A static class that holds extension methods for the <see cref="Startup"/> class.
    /// </summary>
    public static class StartupExtensions
    {
        /// <summary>
        /// Add the default <see cref="AppConfig"/> configurations.
        /// </summary>
        /// <param name="services">The <see cref="IServiceCollection"/> to add the services to.</param>
        /// <param name="configuration">Provide an <see cref="IConfiguration"/> object which provides configuration information.</param>
        /// <param name="appConfig">An out <see cref="AppConfig"/> variable.</param>
        /// <returns>An <see cref="IServiceCollection"/> with necessary services added.</returns>
        public static IServiceCollection AddAppConfig(this IServiceCollection services, IConfiguration configuration, out AppConfig appConfig)
        {
            appConfig = configuration.GetSection("AppConfig").Get<AppConfig>();
            // I'd usually put this in a secret for development and environment variable for production but to keep it simple
            // I'll just hard-code it in the appsettings file.
            appConfig.Database = configuration.GetSection("AppConfig:Database").Get<DbConnectionConfig>();

            return services
                .AddSingleton(appConfig)
                .AddSingleton(appConfig.Database);
        }

		/// <summary>
		/// Add necessary DB connection and provider services.
		/// </summary>
		/// <param name="services">The <see cref="IServiceCollection"/> to add the DB access services to.</param>
		/// <returns>An updated <see cref="IServiceCollection"/> object.</returns>
		public static IServiceCollection AddDbServices(this IServiceCollection services)
			=> services.AddDbContext<IGroceryList, GroceryListRepository>(
				(serviceProvider, options) => options.UseSqlServer(serviceProvider.GetRequiredService<DbConnectionConfig>().ConnectionString)
			);

		/// <summary>
		/// Add the Swagger API page.
		/// </summary>
		/// <param name="services">The <see cref="IServiceCollection"/> to add the services to.</param>
		/// <param name="isDevelopment">Whether or not the current hosting environment is for development or not.
		/// If true, then Swagger is added. Otherwise, it's not.</param>
		/// <returns>An <see cref="IServiceCollection"/> with necessary services added.</returns>
		public static IServiceCollection AddSwagger(this IServiceCollection services, bool isDevelopment)
        {
			if (!isDevelopment)
			{
				return services;
			}

            return services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "Grocery List", Version = "v1" }));
        }
    }
}